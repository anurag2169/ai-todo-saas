import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IntelliDo: AI Task Management",
  description:
    "IntelliDo: Your AI-powered to-do list. Smart task management, intelligent reminders, and seamless collaboration.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={montserrat.className}>
          <CopilotKit runtimeUrl="/api/copilotkit">
            {children}
            <Toaster />
          </CopilotKit>
        </body>
      </html>
    </ClerkProvider>
  );
}
