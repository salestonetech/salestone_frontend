import React from 'react';
import { mockObjections } from '../data/mockData';
import { AlertTriangle, MessageCircle, Lightbulb } from 'lucide-react';

export const Objections: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Análise de Objeções</h1>
        <p className="text-slate-500">Entenda os principais motivos de perda e como contorná-los.</p>
      </div>

      <div className="grid gap-6">
        {mockObjections.map((obj) => (
          <div key={obj.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                        <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">{obj.name}</h3>
                        <p className="text-sm text-slate-500">{obj.count} ocorrências identificadas</p>
                    </div>
                </div>
                <div className="text-right">
                    <span className="text-2xl font-bold text-slate-900">{Math.round((obj.count / 87) * 100)}%</span>
                    <p className="text-xs text-slate-500">do total</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-slate-100">
                <div>
                    <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-3">
                        <MessageCircle className="w-4 h-4 text-slate-400" />
                        Exemplo Detectado
                    </h4>
                    <div className="p-3 bg-slate-50 rounded-lg text-slate-600 text-sm italic border-l-4 border-slate-300">
                        "{obj.example}"
                    </div>
                </div>
                <div>
                    <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-3">
                        <Lightbulb className="w-4 h-4 text-yellow-500" />
                        Sugestão de Resposta (IA)
                    </h4>
                    <div className="p-3 bg-blue-50 rounded-lg text-blue-800 text-sm border-l-4 border-blue-300">
                        {obj.suggestion}
                    </div>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
