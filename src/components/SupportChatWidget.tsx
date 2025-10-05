const SupportChatWidget: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed bottom-20 right-6 w-80 h-96 bg-white rounded-lg shadow-2xl flex flex-col z-50 border border-gray-200
        transform transition-all duration-300 ease-in-out
        ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-8 pointer-events-none"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-blue-300 text-white rounded-t-lg">
        <h3 className="font-semibold text-sm">Support OrganizationBot</h3>
        <button onClick={onClose} className="text-white hover:text-gray-200 transition">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Corpo */}
      <div className="flex-1 p-3 overflow-y-auto space-y-3 text-sm bg-gray-50">
        <div className="flex justify-start">
          <div className="bg-gray-200 p-2 rounded-lg max-w-[80%] shadow-sm">
            Olá! Estou aqui para ajudar com qualquer dúvida sobre o login ou sobre a nossa plataforma. Como posso ajudar hoje?  
          </div>
        </div>
        <div className="flex justify-end">
          <div className="bg-red-100 text-gray-800 p-2 rounded-lg max-w-[80%] shadow-sm">
            (Isto é uma simulação. Digite a sua dúvida aqui.)
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-200">
        <input
          type="text"
          placeholder="Digite sua dúvida..."
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-700 focus:border-red-700 text-gray-800 text-sm"
        />
      </div>
    </div>
  );
};

export default SupportChatWidget;
