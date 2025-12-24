import React, { useState, useEffect, useRef } from 'react';

interface ChatPanelProps {
  character: string;
  episodeLabel: string;
  instantGreeting: string;
  initialHook: string;
  avatar: string;
  onClose: () => void;
}

// Groq Integration Constants
// Enhanced detection to work with standard process.env or Vite's import.meta.env
const getGroqKey = () => {
  const env = (import.meta as any).env;
  return (
    (typeof process !== 'undefined' ? process.env?.GROQ_API_KEY : null) ||
    (env?.VITE_GROQ_API_KEY) ||
    (env?.GROQ_API_KEY) ||
    null
  );
};

const GROQ_MODEL = "llama-3.3-70b-versatile";

const ChatPanel: React.FC<ChatPanelProps> = ({ character, episodeLabel, instantGreeting, initialHook, avatar, onClose }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: instantGreeting }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [imgError, setImgError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Ref to track conversation history for the API
  const conversationHistory = useRef<{ role: 'user' | 'assistant' | 'system'; content: string }[]>([]);

  const getAccentColor = () => {
    if (character === 'Priyank') return '#3b82f6';
    if (character === 'Arzoo') return '#ec4899';
    if (character === 'Debu') return '#a855f7';
    return '#64748b';
  };

  const accentColor = getAccentColor();
  
  const getUserRoleName = () => {
    if (character === 'Priyank') return 'Arzoo';
    if (character === 'Arzoo') return 'Priyank';
    if (character === 'Debu') return 'Assistant';
    return 'User';
  };
  
  const userRoleName = getUserRoleName();
  const placeholderText = character === 'Debu' ? "Ask Debu anything..." : `Reply as ${userRoleName}...`;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Set up the system prompt and initial history
  useEffect(() => {
    const systemInstruction = `You are ${character}, a lead character in the premium drama "${episodeLabel === 'Scene 01' ? 'Deb The Filmmaker' : 'Heart Beats'}".

    PERSONALITY GOALS:
    - NEVER sound like an AI assistant. Use zero formal language.
    - Speak in natural "Hinglish" (Modern Delhi/Mumbai style English mixed with Hindi written in Latin script).
    - Use modern slang (e.g., 'yaar', 'vibe', 'scene', 'fokat', 'mast', 'chal na').
    - Be reactive: If the user is being cold, you be cold. If they flirt, you banter back. 
    - Your responses should feel like a quick WhatsApp/DM from a real person.
    
    STRICT CONSTRAINTS:
    - MAX 20 words per message. Short, punchy, and conversational.
    - NO Devanagari (Hindi script). Only use English alphabet.
    - Stay 100% in character.
    
    SCENE CONTEXT: ${initialHook}.
    CURRENT PLAYER: The user is roleplaying as ${userRoleName}.`;

    conversationHistory.current = [
      { role: 'system', content: systemInstruction },
      { role: 'assistant', content: instantGreeting }
    ];
  }, [character, episodeLabel, initialHook, instantGreeting, userRoleName]);

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;
    
    const apiKey = getGroqKey();
    
    if (!apiKey) {
      console.error("API Key is missing. Ensure VITE_GROQ_API_KEY is set in Vercel.");
      setMessages(prev => [...prev, { role: 'assistant', content: "API Error: Please set API Key in settings and redeploy." }]);
      return;
    }

    const userText = inputValue.trim();
    setInputValue('');
    
    // Update local UI state
    const newUserMsg = { role: 'user' as const, content: userText };
    setMessages(prev => [...prev, newUserMsg]);
    setIsTyping(true);

    // Update internal history for the model
    conversationHistory.current.push({ role: 'user', content: userText });

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: conversationHistory.current,
          temperature: 0.9,
          max_tokens: 150,
          top_p: 0.95,
          stream: false
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error?.message || `Engine failed with status ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content || "Signal gaya... phir se bolo?";
      
      const newAiMsg = { role: 'assistant' as const, content: aiResponse };
      setMessages(prev => [...prev, newAiMsg]);
      conversationHistory.current.push({ role: 'assistant', content: aiResponse });

    } catch (error: any) {
      console.error("Chat Error:", error);
      const errorDisplay = error.message.includes("status 401") 
        ? "Invalid API Key. Check your environment settings." 
        : "Network issue hai shayad... ek baar phir try kar?";
      setMessages(prev => [...prev, { role: 'assistant', content: errorDisplay }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-end justify-center p-4 md:p-8 animate-fade-in pointer-events-none">
      <div 
        className="w-full max-w-lg border border-white/40 rounded-[2.5rem] overflow-hidden flex flex-col shadow-[0_40px_100px_rgba(0,0,0,0.4)] pointer-events-auto h-[75vh] max-h-[750px] mb-20 md:mb-0 transition-all duration-500 transform translate-y-0 bg-white/95 backdrop-blur-3xl"
        style={{ 
          boxShadow: `0 30px 100px -20px rgba(0,0,0,0.3), 0 0 40px -10px ${accentColor}30` 
        }}
      >
        <div className={`px-8 py-6 flex justify-between items-center border-b border-slate-100 bg-white/50 backdrop-blur-md`}>
          <div className="flex items-center gap-4">
            <div className={`relative w-14 h-14 rounded-full p-0.5 border-2 shadow-xl flex items-center justify-center text-lg font-black bg-white`} style={{ borderColor: `${accentColor}` }}>
              <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-slate-50">
                {!imgError ? (
                  <img src={avatar} alt={character} className="w-full h-full object-cover" onError={() => setImgError(true)} />
                ) : (
                  <span className="text-slate-400">{character[0]}</span>
                )}
              </div>
              <div className="absolute top-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse z-10" />
            </div>
            <div>
              <p className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-400 leading-none mb-1">Inscene Live</p>
              <h4 className="text-xl font-black italic tracking-tighter uppercase leading-none text-slate-900">{character}</h4>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 bg-slate-50 rounded-full transition-all active:scale-90 border border-slate-100">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5 text-slate-400"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 hide-scrollbar bg-transparent">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
              <div className={`max-w-[85%] px-5 py-3.5 rounded-3xl text-[14px] shadow-sm ${
                m.role === 'user' 
                  ? 'bg-slate-900 border border-slate-800 text-white rounded-tr-none font-medium' 
                  : `bg-slate-100 border border-slate-200 text-slate-800 font-semibold rounded-tl-none`
              }`}>
                {m.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start animate-fade-in">
               <div className="bg-slate-100 px-5 py-3.5 rounded-3xl rounded-tl-none border border-slate-200 flex gap-1.5 items-center">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
               </div>
            </div>
          )}
        </div>

        <div className="p-8 pt-0">
          <div className="relative group">
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={placeholderText}
              className="w-full bg-slate-100 border border-slate-200 rounded-[2rem] px-8 py-5 text-sm font-medium focus:outline-none focus:bg-white transition-all text-slate-900 placeholder:text-slate-400 pr-16 shadow-inner"
            />
            <button 
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              className="absolute right-2 top-2 bottom-2 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-xl active:scale-90 transition-all disabled:opacity-30"
              style={{ backgroundColor: accentColor }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-0.5"><path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" /></svg>
            </button>
          </div>
          <div className="mt-4 flex justify-center opacity-40">
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">Inscene Personality Engine</p>
          </div>
        </div>
      </div>
      
      <style>{`
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        .animate-slide-up { animation: slideUpChat 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUpChat { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default ChatPanel;