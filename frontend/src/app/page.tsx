'use client';
import { useState, useEffect } from 'react';
import InputForm from '@/components/InputForm';
import AnswerDisplay from '@/components/AnswerDisplay';
import TracePanel from '@/components/TracePanel';
import HistorySidebar from '@/components/HistorySidebar';
import DocumentUpload from '@/components/DocumentUpload';
import { api } from '@/services/api.service';
import { Search, BrainCircuit, Plus } from 'lucide-react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);

  const fetchHistory = async () => {
    try {
      const data = await api.getHistory();
      setHistory(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleAsk = async (question: string) => {
    setLoading(true);
    try {
      const data = await api.ask(question);
      setResult(data);
      fetchHistory();
    } catch (err) {
      alert('Error running pipeline');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#06060a] flex justify-center overflow-x-hidden">
      <div className="w-full max-w-[1440px] flex h-screen bg-[#0a0a0f] text-white overflow-hidden relative shadow-2xl border-x border-white/5">
        {/* Modal for Upload */}
        {isUploadOpen && <DocumentUpload onClose={() => setIsUploadOpen(false)} />}

        {/* Sidebar for History - Hidden on mobile, shown on large screens */}
        <div className="hidden lg:block h-full">
          <HistorySidebar history={history} onSelect={(item) => setResult({ finalAnswer: item.finalAnswer, trace: item })} />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col relative overflow-hidden">
          {/* Background blobs for aesthetics */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] -z-10 rounded-full" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 blur-[100px] -z-10 rounded-full" />

          {/* Header */}
          <header className="p-4 sm:p-6 border-b border-white/5 flex items-center justify-between backdrop-blur-md bg-[#0a0a0f]/50 sticky top-0 z-20">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-blue-600/20 rounded-xl border border-blue-500/30">
                <BrainCircuit className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
              </div>
              <div>
                <h1 className="text-base sm:text-xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent truncate max-w-[150px] sm:max-w-none">Multi-Agent Researcher</h1>
                <p className="text-[10px] sm:text-xs text-white/40">Powered by TF-IDF</p>
              </div>
            </div>
            <button
              onClick={() => setIsUploadOpen(true)}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-white/80 text-xs sm:text-sm"
            >
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Add Document</span>
              <span className="xs:hidden">Add</span>
            </button>
          </header>

          {/* Scrollable Content */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar">
            <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
              {!result && !loading && (
                <div className="py-12 sm:py-20 text-center space-y-4">
                  <div className="inline-block p-4 bg-white/5 rounded-full mb-4">
                    <Search className="w-8 h-8 sm:w-12 sm:h-12 text-blue-500/50" />
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-bold text-white/90">What are we researching today?</h2>
                  <p className="text-sm sm:text-base text-white/40 max-w-md mx-auto">Submit a query and watch our agents analyze, rank, and summarize the truth.</p>
                </div>
              )}

              {result && <AnswerDisplay answer={result.finalAnswer} />}
              
              {result && result.trace && (
                <div className="mt-8 sm:mt-12 p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/2">
                  <TracePanel trace={result.trace} />
                </div>
              )}
            </div>
          </main>

          {/* Footer Input */}
          <footer className="p-4 sm:p-8 backdrop-blur-2xl bg-[#0a0a0f]/80 border-t border-white/5">
            <div className="max-w-4xl mx-auto">
              <InputForm onAsk={handleAsk} loading={loading} />
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
