import { useState } from "react";
import SupportChatWidget from "./SupportChatWidget"; // ajuste o caminho se necessário

export default function ChatIaAgent() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      {/* Widget de chat */}
      <SupportChatWidget
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      {/* Botão flutuante */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 p-3 bg-blue-200 hover:bg-blue-400 text-white rounded-full shadow-lg transition duration-300 z-50"
          aria-label="Precisa de ajuda?"
          title="Precisa de ajuda?"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21a9 9 0 100-18 9 9 0 000 18z"
            />
          </svg>
        </button>
      )}
    </>
  );
}
