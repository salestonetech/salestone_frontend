import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, User, Calendar, ArrowRight, Filter } from 'lucide-react';
import clsx from 'clsx';
import { type Conversation } from '../types';
import { fetchJson } from '../lib/api';

export const Conversations: React.FC = () => {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [salespersonFilter, setSalespersonFilter] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  // Keep track of all unique salespersons for the dropdown filter
  // We populate this on the initial load and keep it stable even when filtering
  const [allSalespersons, setAllSalespersons] = useState<string[]>([]);

  // Initial fetch to populate salespersons list (and initial data)
  useEffect(() => {
    fetchConversations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // Effect to re-fetch when filters change
  useEffect(() => {
    fetchConversations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salespersonFilter, startDate, endDate]);

  const fetchConversations = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (salespersonFilter) params.append('salesperson', salespersonFilter);
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);

      const queryString = params.toString();
      const url = `/conversations${queryString ? `?${queryString}` : ''}`;
      
      const data = await fetchJson<Conversation[]>(url);
      setConversations(data);

      // If this is the first load (or we don't have salespersons yet), extract them
      // Note: In a real app, we might want a separate endpoint for this list
      if (allSalespersons.length === 0 && data.length > 0) {
        const unique = Array.from(new Set(data.map(c => c.salespersonName))).sort();
        setAllSalespersons(unique);
      }
    } catch (err) {
      console.error('Failed to fetch conversations:', err);
      setError('Falha ao carregar conversas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Conversas</h1>
          <p className="text-slate-500">Lista de conversas analisadas.</p>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-700">Filtros:</span>
            </div>
            
            <select 
                value={salespersonFilter}
                onChange={(e) => setSalespersonFilter(e.target.value)}
                className="px-3 py-1.5 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
                <option value="">Todos Vendedores</option>
                {allSalespersons.map(sp => (
                    <option key={sp} value={sp}>{sp}</option>
                ))}
            </select>

            <div className="flex items-center gap-2">
                <input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="px-3 py-1.5 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Data inicial"
                />
                <span className="text-slate-400">-</span>
                <input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="px-3 py-1.5 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Data final"
                />
            </div>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200">
          {error}
          <button 
            onClick={fetchConversations}
            className="ml-4 underline hover:no-underline font-medium"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12 text-slate-500">
          Carregando conversas...
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && conversations.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200 border-dashed">
            <p className="text-slate-500">Nenhuma conversa encontrada com os filtros selecionados.</p>
        </div>
      )}

      {/* List */}
      {!loading && !error && conversations.length > 0 && (
        <div className="grid gap-4">
            {conversations.map((conv) => (
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
      )}
    </div>
  );
};
