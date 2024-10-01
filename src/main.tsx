import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { SocketProvider } from "./components/contexts/SocketContext/SocketContext";
import { AuthProvider } from "./components/contexts/AuthContext/AuthContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </AuthProvider>
  </StrictMode>
);
