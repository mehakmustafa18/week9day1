'use client';
import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

export default function InputForm({ onAsk, loading }: { onAsk: (q: string) => void; loading: boolean }) {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && !loading) {
      onAsk(question);
      setQuestion('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative group">
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a research question..."
        className="w-full p-4 pr-16 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-white/30 text-white shadow-xl backdrop-blur-xl"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading || !question.trim()}
        className="absolute right-2 top-2 bottom-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors text-white shadow-lg flex items-center justify-center"
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
      </button>
    </form>
  );
}
