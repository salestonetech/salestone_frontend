import React, { useState } from 'react';
import { Filter, Download, Calendar } from 'lucide-react';

export const Analytics: React.FC = () => {
  const [period, setPeriod] = useState('month');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Relatórios e Analytics</h1>
          <p className="text-slate-500">Gere insights detalhados sobre a performance.</p>
        </div>
        <div className="flex gap-2">
            <select 
                value={period} 
                onChange={(e) => setPeriod(e.target.value)}
                className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
                <option value="week">Esta Semana</option>
                <option value="month">Este Mês</option>
                <option value="semester">Este Semestre</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
                <Download className="w-4 h-4" /> Exportar
            </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Resumo Executivo</h2>
        <div className="space-y-4 text-slate-600">
            <p>
                Neste período, o time de vendas realizou <strong className="text-slate-900">342 conversas</strong>, resultando em um aumento de <strong className="text-green-600">12%</strong> no volume de mensagens trocadas.
            </p>
            <p>
                A objeção mais comum foi <strong className="text-slate-900">"Preço"</strong>, aparecendo em 35% das negociações que não fecharam. Sugerimos focar no treinamento de proposta de valor.
            </p>
            <p>
                O sentimento geral dos clientes está <strong className="text-slate-900">positivo (65%)</strong>, indicando boa aceitação da abordagem inicial.
            </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-slate-800 mb-4">Insights Chave</h3>
            <ul className="space-y-3">
                <li className="flex gap-3">
                    <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                    <p className="text-sm text-slate-600">Vendedores que respondem em até 5 minutos tem 2x mais chance de fechar.</p>
                </li>
                <li className="flex gap-3">
                    <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                    <p className="text-sm text-slate-600">O uso da palavra "Desconto" prematuramente reduz a percepção de valor.</p>
                </li>
                <li className="flex gap-3">
                    <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                    <p className="text-sm text-slate-600">Clientes que mencionam "Concorrência" tendem a fechar se receberem comparativo técnico.</p>
                </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-slate-800 mb-4">Sugestões de Melhoria</h3>
            <ul className="space-y-3">
                <li className="flex gap-3">
                    <div className="w-2 h-2 mt-2 rounded-full bg-amber-500"></div>
                    <p className="text-sm text-slate-600">Treinar equipe em contorno de objeção de preço.</p>
                </li>
                <li className="flex gap-3">
                    <div className="w-2 h-2 mt-2 rounded-full bg-amber-500"></div>
                    <p className="text-sm text-slate-600">Atualizar scripts de saudação para serem mais consultivos.</p>
                </li>
                <li className="flex gap-3">
                    <div className="w-2 h-2 mt-2 rounded-full bg-amber-500"></div>
                    <p className="text-sm text-slate-600">Monitorar uso de termos proibidos que aumentou 2% na última semana.</p>
                </li>
            </ul>
          </div>
      </div>
    </div>
  );
};
