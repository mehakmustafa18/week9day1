'use client';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, FileText, Search, Layers, FileSearch } from 'lucide-react';

const iconMap = {
  'Question Splitter': <Layers className="w-4 h-4" />,
  'Document Finder': <Search className="w-4 h-4" />,
  'Ranker': <FileSearch className="w-4 h-4" />,
  'Summarizer': <FileText className="w-4 h-4" />,
  'Cross-Checker': <AlertCircle className="w-4 h-4" />,
  'Final Answer Generator': <CheckCircle2 className="w-4 h-4" />,
};

export default function TracePanel({ trace }: { trace: any }) {
  if (!trace) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white/60 mb-4">Execution Trace</h2>
      <div className="space-y-4 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-white/10">
        {trace.steps.map((step: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex gap-4 group"
          >
            <div className="z-10 bg-gray-900 rounded-full p-0.5 border border-white/20">
              <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
            </div>
            <div className="flex-1 pb-4">
              <div className="flex items-center gap-2 text-sm font-medium text-white/90">
                {iconMap[step.step as keyof typeof iconMap]}
                <span>{step.step}</span>
              </div>
              <div className="mt-2 text-xs text-white/40 overflow-hidden text-ellipsis bg-white/5 p-2 rounded-lg border border-white/5">
                {typeof step.result === 'string' ? step.result : JSON.stringify(step.result, null, 2)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
