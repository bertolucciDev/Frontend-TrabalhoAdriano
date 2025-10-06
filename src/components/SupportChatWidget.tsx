import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface Message {
  from: 'user' | 'bot';
  text: string;
}

const SupportChatWidget: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { from: 'bot', text: 'Olá! Estou aqui para ajudar com qualquer dúvida sobre o login ou a nossa plataforma. Como posso ajudar hoje?' },
  ]);
  const [input, setInput] = useState('');
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll automático para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Conectar WebSocket ao montar o componente
  useEffect(() => {
    socketRef.current = io('http://hostingfox.xyz:3015');

    socketRef.current.on('response', (data: { message: string }) => {
      setMessages(prev => [...prev, { from: 'bot', text: data.message }]);
    });

    socketRef.current.on('error', (data: { message: string }) => {
      setMessages(prev => [...prev, { from: 'bot', text: `Erro: ${data.message}` }]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages(prev => [...prev, { from: 'user', text: trimmed }]);
    socketRef.current?.emit('message', trimmed);
    setInput('');
  };

  return (
    <div
      className={`fixed bottom-6 right-6 w-96 h-120 bg-white rounded-xl shadow-2xl flex flex-col z-50 border border-gray-200
        transform transition-all duration-300 ease-in-out
        ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto scale-100" : "opacity-0 translate-y-4 pointer-events-none scale-95"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-t-xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-3.582 8.25-8 8.25a8.25 8.25 0 01-8-8.25 8.25 8.25 0 018-8.25c4.418 0 8 3.694 8 8.25z" />
            </svg>
          </div>
          <h3 className="font-semibold text-base">Support OrganizationBot</h3>
        </div>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white transition-all duration-200 hover:bg-white/10 p-2 rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Corpo */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 text-sm bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`px-4 py-3 rounded-2xl max-w-[85%] shadow-sm ${msg.from === 'user'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-br-none'
                : 'bg-white text-gray-700 rounded-bl-none border border-gray-200'
              }`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 flex items-center space-x-3">
        <input
          type="text"
          placeholder="Digite sua dúvida..."
          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-800 text-sm bg-white shadow-sm"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => { if (e.key === 'Enter') handleSend(); }}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SupportChatWidget;