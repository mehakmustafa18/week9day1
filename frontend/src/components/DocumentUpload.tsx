'use client';
import { useState, useEffect } from 'react';
import { Upload, X } from 'lucide-react';
import { api } from '@/services/api.service';

export default function DocumentUpload({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ title: '', topic: '', content: '' });

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.uploadDocument(formData);
      setFormData({ title: '', topic: '', content: '' });
      onClose();
      alert('Document uploaded successfully!');
    } catch (err) {
      alert('Failed to upload');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-start justify-center p-4 bg-[#0a0a0f] overflow-y-auto pt-10 sm:pt-20 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-xl bg-[#0f0f15] border border-white/10 rounded-[24px] shadow-[0_0_50px_rgba(0,0,0,1)] relative my-4 animate-in slide-in-from-top-8 duration-500"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white">Add Knowledge</h2>
          </div>
          <button 
            type="button"
            onClick={onClose} 
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Area */}
        <div className="p-8 space-y-6">
          <form id="upload-form" onSubmit={handleUpload} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/60 ml-1">Document Title</label>
              <input
                required
                placeholder="e.g. SQL vs NoSQL performance"
                className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none focus:border-blue-500/50 focus:bg-white/[0.08] transition-all"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/60 ml-1">Topic</label>
              <input
                required
                placeholder="e.g. Databases"
                className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none focus:border-blue-500/50 focus:bg-white/[0.08] transition-all"
                value={formData.topic}
                onChange={e => setFormData({ ...formData, topic: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/60 ml-1">Content</label>
              <textarea
                required
                placeholder="Paste the research content here..."
                rows={8}
                className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none focus:border-blue-500/50 focus:bg-white/[0.08] transition-all resize-none"
                value={formData.content}
                onChange={e => setFormData({ ...formData, content: e.target.value })}
              />
            </div>
          </form>

          <button
            form="upload-form"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <><Upload className="w-4 h-4" /> Upload Document</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
