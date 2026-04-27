import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// 🔥 Busca token no backend e inicializa o Watson
async function initWatsonChat() {
  if (window.wxoLoader) return; // evita inicializar duas vezes

  // Busca o JWT no seu backend local
  let token = null;
  try {
    const res = await fetch("http://localhost:3001/get-token");
    const data = await res.json();
    token = data.access_token;
  } catch (err) {
    console.error("Erro ao buscar token IBM:", err);
    return;
  }

  if (!token) {
    console.error("Token IBM não recebido.");
    return;
  }

  window.wxOConfiguration = {
    orchestrationID: "20260427-1838-4205-2015-479518aa6f47_20260427-1839-1937-5081-5ca9bf1794e1",
    hostURL: "https://dl.watson-orchestrate.ibm.com",
    rootElementID: "chat-root",
    chatOptions: {
      agentId: "90e24a42-3368-4873-b62c-143911e15779",
      agentEnvironmentId: "2c1ae92e-316b-4e79-aa58-9cdb4f6a40a4",
    }
  };

  // 🔥 Responde ao evento de autenticação com o token
  window.addEventListener("authTokenNeeded", (event) => {
    event.authToken = token;
  });

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

// Inicializa o Watson
initWatsonChat();

// 🔥 React App
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);