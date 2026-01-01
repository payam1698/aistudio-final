
import React from 'react';
import { Bot, MessageCircle, X } from 'lucide-react';

interface ChatbotButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

const ChatbotButton: React.FC<ChatbotButtonProps> = ({ onClick, isOpen }) => {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-accent/30 ${
        isOpen ? 'bg-gray-700 rotate-90' : 'bg-[#F4C700] hover:bg-[#CFA900]'
      }`}
      aria-label="پشتیبانی هوشمند"
    >
      {isOpen ? (
        <X className="text-white" size={28} />
      ) : (
        <Bot className="text-[#002147] animate-pulse" size={32} />
      )}
      
      {/* Notification Dot (Only show when closed) */}
      {!isOpen && (
        <span className="absolute top-0 right-0 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
        </span>
      )}
    </button>
  );
};

export default ChatbotButton;
