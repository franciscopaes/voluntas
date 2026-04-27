import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// 🔥 Inicializa Watson sem autenticação (Security desativado)
function initWatsonChat() {
  if (window.wxoLoader) return;

  window.wxOConfiguration = {
    orchestrationID: "20260427-1838-4205-2015-479518aa6f47_20260427-1839-1937-5081-5ca9bf1794e1",
    hostURL: "https://dl.watson-orchestrate.ibm.com",
    rootElementID: "chat-root",
    chatOptions: {
      agentId: "90e24a42-3368-4873-b62c-143911e15779",
      agentEnvironmentId: "2c1ae92e-316b-4e79-aa58-9cdb4f6a40a4",
    }
  };

  const script = document.createElement("script");
  script.src = `${window.wxOConfiguration.hostURL}/wxochat/wxoLoader.js?embed=true`;
  script.async = true;

  script.onload = () => {
    if (window.wxoLoader) {
      window.wxoLoader.init(window.wxOConfiguration);
    }
  };

  document.body.appendChild(script);
}

// 🔥 Cria div pro chat
const chatDiv = document.createElement("div");
chatDiv.id = "chat-root";
document.body.appendChild(chatDiv);

initWatsonChat();

// 🔥 React App
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);