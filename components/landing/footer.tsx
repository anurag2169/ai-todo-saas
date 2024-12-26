import { Github, Linkedin, Code } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-800/50">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2 ">
          <Link
            href="https://anuragdev-phi.vercel.app/"
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Twitter</span>
            <Code className="h-6 w-6 text-primary" />
          </Link>
          <Link
            href="https://github.com/anurag2169"
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">GitHub</span>
            <Github className="h-6 w-6 text-primary" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/anuragdubey2169/"
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">LinkedIn</span>
            <Linkedin className="h-6 w-6 text-primary" />
          </Link>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-500">
            &copy; {new Date().getFullYear()} IntelliDo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
