import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, User, Bot, AlertTriangle, ThumbsUp, ThumbsDown, ShieldAlert } from 'lucide-react';
import { mockConversations } from '../data/mockData';
import clsx from 'clsx';

export const ConversationDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const conversation = mockConversations.find(c => c.id === id);

  if (!conversation) {
    return <div>Conversa não encontrada</div>;
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-6">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
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

      {/* AI Analysis Panel */}
      <div className="w-full lg:w-80 flex flex-col gap-4 overflow-y-auto">
        
        {/* Summary */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-3">
                <Bot className="w-5 h-5 text-purple-600" />
                Resumo IA
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
                O cliente demonstrou interesse no plano Enterprise mas apresentou objeções sobre o preço. O vendedor argumentou sobre o ROI. A negociação está em andamento.
            </p>
        </div>

        {/* Sentiment */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-slate-800 mb-3">Sentimento</h3>
            <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[60%]"></div>
                </div>
                <span className="text-sm font-bold text-emerald-600">60% Positivo</span>
            </div>
            <div className="flex gap-2 text-xs text-slate-500">
                <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" /> Confiança</span>
                <span className="flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Preocupação com preço</span>
            </div>
        </div>

        {/* Objections */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Objeções Detectadas
            </h3>
            <div className="space-y-3">
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                    <p className="text-sm font-medium text-amber-800">Preço Alto</p>
                    <p className="text-xs text-amber-600 mt-1">"achei o preço um pouco alto"</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                    <p className="text-sm font-medium text-amber-800">Necessidade de Aprovação</p>
                    <p className="text-xs text-amber-600 mt-1">"Vou pensar e te retorno"</p>
                </div>
            </div>
        </div>

         {/* Warnings */}
         <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-3">
                <ShieldAlert className="w-5 h-5 text-red-500" />
                Alertas
            </h3>
            <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                <p className="text-sm font-medium text-red-800">Nenhum alerta crítico</p>
                <p className="text-xs text-red-600 mt-1">Nenhuma palavra proibida foi detectada nesta conversa.</p>
            </div>
        </div>

      </div>
    </div>
  );
};
