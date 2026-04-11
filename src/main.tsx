
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import { initializeResumeAnalyticsTransport } from "./lib/analytics";
  import "./index.css";

  initializeResumeAnalyticsTransport();

  createRoot(document.getElementById("root")!).render(<App />);
  
