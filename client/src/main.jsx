import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Basic global styles so you can see text
const css = `
  html,body,#root { height: 100%; margin: 0; }
  body { font-family: system-ui, Arial, sans-serif; background:#fafafa; color:#111; }
  .container { max-width: 900px; margin: 24px auto; padding: 0 16px; }
  .card { background:#fff; border:1px solid #eee; border-radius:12px; padding:16px; box-shadow:0 1px 2px rgba(0,0,0,.04); }
`;
const style = document.createElement("style");
style.innerHTML = css;
document.head.appendChild(style);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
