import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Features } from "@/components/landing/features";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { Testimonials } from "@/components/landing/testimonials";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Features />
      <Testimonials />
      <Footer />
    </div>
  );
}
