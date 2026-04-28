'use client';
import { History as HistoryIcon, Clock } from 'lucide-react';

export default function HistorySidebar({ history, onSelect }: { history: any[]; onSelect: (trace: any) => void }) {
  return (
    <div className="w-80 h-full flex-shrink-0 border-r border-white/10 bg-white/2 backdrop-blur-3xl overflow-y-auto hidden lg:block custom-scrollbar">
      <div className="p-6 border-b border-white/10 flex items-center gap-2">
        <HistoryIcon className="w-5 h-5 text-blue-400" />
        <h2 className="font-semibold text-white/90">Past Queries</h2>
      </div>
      <div className="divide-y divide-white/5">
        {history.map((item, i) => (
          <button
            key={i}
            onClick={() => onSelect(item)}
            className="w-full p-4 text-left hover:bg-white/5 transition-colors group"
          >
            <div className="text-sm font-medium text-white/90 line-clamp-1 group-hover:text-blue-400 mb-1">
              {item.question || 'Previous Query'}
            </div>
            <div className="text-[11px] text-white/50 line-clamp-2 italic">
              {item.finalAnswer.substring(0, 60)}...
            </div>
            <div className="flex items-center gap-1 text-[10px] text-white/30">
              <Clock className="w-3 h-3" />
              {new Date(item.createdAt).toLocaleString()}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
