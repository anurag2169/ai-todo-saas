import Navbar from "@/components/Navbar";
import { CopilotKitCSSProperties, CopilotPopup } from "@copilotkit/react-ui";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <div
        style={
          {
            "--copilot-kit-primary-color": "#222222",
          } as CopilotKitCSSProperties
        }
        title="Copilot Popup Assistant"
      >
        <CopilotPopup
          instructions={
            "You are an AI assistant specialized in managing to-do lists. Follow the user's instructions to perform CRUD operations (Create, Read, Update, Delete) on their tasks. Respond clearly and helpfully based on the information provided."
          }
          labels={{
            title: "Popup Assistant",
            initial:
              "Hi there! How can I assist you today? I can help you manage your to-do list.",
          }}
        />
      </div>
    </>
  );
}
