"use client";

import { Button } from "@/components/ui/button";
import { ClipboardList } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <div className="relative isolate px-6  lg:px-8">
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <ClipboardList className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Manage tasks with ease and collaboration
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Task Master helps you organize your daily tasks, collaborate with
            team members, and stay productive with a beautiful and intuitive
            interface.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg">
              <Link href="/sign-up">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
