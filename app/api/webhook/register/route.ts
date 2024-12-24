import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOKS_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("please add webhook secret in env");
  }

  const headerPayload = headers();
  const svix_id = (await headerPayload).get("svix-id");
  const svix_timestamp = (await headerPayload).get("svix-timestamp");
  const svix_signature = (await headerPayload).get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", {
      status: 400,
    });
  }

  // const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created") {
    try {
      const { email_addresses, primary_email_address_id } = evt.data;

      //   logs pratice
      const primaryEmail = email_addresses.find(
        (email) => email.id === primary_email_address_id
      );


      if (!primaryEmail) {
        return new Response("No Primary email found", { status: 400 });
      }

      //   create a user in db

      const newUser = await prisma.user.create({
        data: {
          id: evt.data.id!,
          email: primaryEmail.email_address,
          isSubscribed: false,
        },
      });
    } catch (error: any) {
      return new Response("Error creating user in database", { status: 500 });
    }
  }

  return new Response("webhook recieved succcessfully", { status: 200 });
}
