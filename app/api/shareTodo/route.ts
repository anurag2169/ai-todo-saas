import { auth, currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { userId } = await auth();

  const currentUserData = await currentUser();
  const sharedBy = currentUserData?.emailAddresses[0].emailAddress;

  if (!userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const { todoId, recipientEmail } = await req.json();

  if (!todoId || !recipientEmail) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
    });
  }

  try {
    // Verify that the todo exists and belongs to the authenticated user
    const todo = await prisma.todo.findUnique({
      where: { id: todoId },
    });

    if (!todo || todo.userId !== userId) {
      return new Response(
        JSON.stringify({ error: "You do not have access to this todo" }),
        { status: 403 }
      );
    }

    const recipient = await prisma.user.findUnique({
      where: { email: recipientEmail },
      include: { SharedTodo: true },
    });

    if (!recipient) {
      return NextResponse.json(
        {
          message:
            "The specified user does not exist. Please check the email address and try again.",
        },
        {
          status: 400,
        }
      );
    }

    // Check if the recipient has already been shared the same todo
    const isTodoAlreadyShared = recipient.SharedTodo.some(
      (sharedTodo) => sharedTodo.todoId === todoId
    );
    if (isTodoAlreadyShared) {
      return NextResponse.json(
        {
          message: "This todo has already been shared with this user.",
        },
        { status: 400 }
      );
    }

    await prisma.$transaction([
      prisma.todo.update({
        where: { id: todoId },
        data: {
          sharedWith: [
            ...new Set([...(todo.sharedWith || []), recipientEmail]),
          ],
          sharedBy: sharedBy,
        },
      }),
      prisma.sharedTodo.create({
        data: {
          todoId,
          userId: recipient.id,
          sharedAt: new Date(),
        },
      }),
    ]);

    return NextResponse.json(
      { message: "Todo shared successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    });
  }
}

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const sharedTodos = await prisma.sharedTodo.findMany({
      where: { userId },
      include: { todo: true },
    });

    if (!sharedTodos || sharedTodos.length === 0) {
      return NextResponse.json({ sharedTodos: [] }, { status: 200 });
    }

    return NextResponse.json({ sharedTodos }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      {
        status: 500,
      }
    );
  }
}
