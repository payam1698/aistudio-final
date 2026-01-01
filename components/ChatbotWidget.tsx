
import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, User, Loader2 } from 'lucide-react';
import Button from './Button';

interface Message {
  id: string;
  role: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

interface ChatbotWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'bot',
      text: 'سلام! 👋 من دستیار هوشمند «روانکاو» هستم. چطور می‌تونم در مورد دوره‌ها یا خدمات روانکارگاه بهتون کمک کنم؟',
      timestamp: new Date()
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    // Simulate response delay (Replace this with actual Gemini API call later)
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: 'پیام شما دریافت شد. این یک پاسخ آزمایشی است. به زودی هوش مصنوعی جمینای به این بخش متصل خواهد شد.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
      setIsLoading(false);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 left-6 z-50 w-[350px] max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col h-[500px] max-h-[80vh] animate-fade-in-up">
      
      {/* Header */}
      <div className="bg-[#002147] p-4 flex justify-between items-center text-white shadow-md shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-white/10 p-1.5 rounded-full backdrop-blur-sm">
            <Bot size={24} className="text-[#F4C700]" />
          </div>
          <div>
            <h3 className="font-bold text-lg leading-none">روانکاو</h3>
            <span className="text-[10px] text-gray-300 opacity-80">پاسخگوی هوشمند ۲۴ ساعته</span>
          </div>
        </div>
        <button onClick={onClose} className="hover:bg-white/10 p-1 rounded-full transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-[#F4C700]' : 'bg-[#002147]'}`}>
              {msg.role === 'user' ? <User size={16} className="text-[#002147]" /> : <Bot size={16} className="text-white" />}
            </div>
            
            <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-white border border-gray-100 text-gray-800 rounded-br-none' 
                : 'bg-[#002147] text-white rounded-bl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-end gap-2">
             <div className="w-8 h-8 rounded-full bg-[#002147] flex items-center justify-center shrink-0">
                <Bot size={16} className="text-white" />
             </div>
             <div className="bg-[#002147] px-4 py-3 rounded-2xl rounded-bl-none shadow-sm">
                <Loader2 size={16} className="text-white animate-spin" />
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 shrink-0">
        <div className="relative flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="سوال خود را بپرسید..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F4C700] focus:ring-1 focus:ring-[#F4C700] transition-all text-sm"
          />
          <button 
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="absolute left-2 p-2 bg-[#002147] text-white rounded-lg hover:bg-[#00152e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={16} className={inputValue.trim() ? '' : 'opacity-70'} />
          </button>
        </div>
        <div className="text-center mt-2">
            <span className="text-[10px] text-gray-400">قدرت گرفته از هوش مصنوعی</span>
        </div>
      </form>
    </div>
  );
};

export default ChatbotWidget;
