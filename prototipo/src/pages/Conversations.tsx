import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, User, Calendar, ArrowRight } from 'lucide-react';
import { mockConversations } from '../data/mockData';
import clsx from 'clsx';

export const Conversations: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Conversas</h1>
          <p className="text-slate-500">Lista de conversas analisadas.</p>
        </div>
      </div>

      <div className="grid gap-4">
        {mockConversations.map((conv) => (
          <div 
            key={conv.id}
            onClick={() => navigate(`/conversations/${conv.id}`)}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-slate-900">{conv.clientName}</h3>
                <span className={clsx(
                  "px-2 py-0.5 rounded-full text-xs font-medium",
                  conv.status === 'active' ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-700"
                )}>
                  {conv.status === 'active' ? 'Ativo' : 'Fechado'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                <User className="w-4 h-4" />
                <span>{conv.salespersonName}</span>
                <span className="mx-1">•</span>
                <Calendar className="w-4 h-4" />
                <span>{conv.date}</span>
              </div>
              <p className="text-slate-600 line-clamp-1 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-slate-400" />
                "{conv.lastMessage}"
              </p>
            </div>
            <div className="flex items-center gap-2 text-primary-600 font-medium">
              Ver detalhes <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
