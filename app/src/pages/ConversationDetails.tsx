import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import clsx from 'clsx';
import { type Conversation } from '../types';
import { fetchJson } from '../lib/api';

export const ConversationDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchConversation(id);
    }
  }, [id]);

  const fetchConversation = async (conversationId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchJson<Conversation>(`/conversations/${conversationId}`);
      setConversation(data);
    } catch (err) {
      console.error('Failed to fetch conversation:', err);
      setError('Conversa não encontrada ou erro ao carregar.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
        <p className="text-slate-500">Carregando detalhes...</p>
      </div>
    );
  }

  if (error || !conversation) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] gap-4">
        <p className="text-red-600">{error || 'Conversa não encontrada'}</p>
        <button 
            onClick={() => navigate('/conversations')} 
            className="text-primary-600 hover:underline"
        >
            Voltar para lista
        </button>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-6 p-6">
      {/* Chat Area - Now Full Width */}
      <div className="flex-1 flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden w-full max-w-5xl mx-auto">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-4 bg-slate-50">
          <button onClick={() => navigate('/conversations')} className="text-slate-500 hover:text-slate-700">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-semibold text-slate-900">{conversation.clientName}</h2>
            <p className="text-xs text-slate-500">Vendedor: {conversation.salespersonName}</p>
          </div>
          <div className="ml-auto">
             <span className={clsx(
                  "px-2 py-0.5 rounded-full text-xs font-medium",
                  conversation.status === 'active' ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-700"
                )}>
                  {conversation.status === 'active' ? 'Ativo' : 'Fechado'}
             </span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
          {conversation.messages.map((msg) => (
            <div 
              key={msg.id} 
              className={clsx(
                "flex flex-col max-w-[80%]",
                msg.sender === 'salesperson' ? "ml-auto items-end" : "mr-auto items-start"
              )}
            >
              <div className={clsx(
                "p-3 rounded-lg shadow-sm text-sm",
                msg.sender === 'salesperson' 
                  ? "bg-primary-600 text-white rounded-tr-none" 
                  : "bg-white text-slate-800 border border-slate-100 rounded-tl-none"
              )}>
                {msg.text}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 px-1">
                {msg.timestamp} • {msg.sender === 'salesperson' ? 'Vendedor' : 'Cliente'}
              </span>
            </div>
          ))}
        </div>

        {/* Input Placeholder */}
        <div className="p-4 border-t border-slate-100 bg-white flex gap-2">
            <input 
                disabled
                type="text" 
                placeholder="Esta é uma visualização de histórico..." 
                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 text-sm cursor-not-allowed"
            />
            <button disabled className="p-2 bg-slate-200 text-slate-400 rounded-lg cursor-not-allowed">
                <Send className="w-5 h-5" />
            </button>
        </div>
      </div>
    </div>
  );
};
