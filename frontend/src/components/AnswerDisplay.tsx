'use client';
import { motion } from 'framer-motion';

export default function AnswerDisplay({ answer }: { answer: string }) {
  if (!answer) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-3xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-2xl"
    >
      <div className="prose prose-invert max-w-none">
        {answer.split('\n').map((line, i) => {
          if (line.startsWith('###')) {
            return <h3 key={i} className="text-xl font-bold mt-6 mb-4 text-blue-400">{line.replace('###', '').trim()}</h3>;
          }
          if (line.startsWith('-')) {
            return <li key={i} className="text-white/80 ml-4 mb-2">{line.replace('-', '').trim()}</li>;
          }
          return <p key={i} className="text-white/80 mb-4">{line}</p>;
        })}
      </div>
    </motion.div>
  );
}
