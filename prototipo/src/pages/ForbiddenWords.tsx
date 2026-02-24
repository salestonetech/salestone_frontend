import React, { useState } from 'react';
import { Trash2, Plus, ShieldAlert } from 'lucide-react';
import { mockForbiddenWords } from '../data/mockData';

export const ForbiddenWords: React.FC = () => {
  const [words, setWords] = useState(mockForbiddenWords);
  const [newWord, setNewWord] = useState('');

  const handleAddWord = () => {
    if (newWord.trim()) {
      setWords([...words, { id: Date.now().toString(), word: newWord }]);
      setNewWord('');
    }
  };

  const handleDelete = (id: string) => {
    setWords(words.filter(w => w.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Palavras Proibidas</h1>
        <p className="text-slate-500">Configure palavras que devem gerar alertas quando usadas pelos vendedores.</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex gap-4 mb-8">
            <input 
                type="text" 
                value={newWord}
                onChange={(e) => setNewWord(e.target.value)}
                placeholder="Adicionar nova palavra ou frase..."
                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                onKeyDown={(e) => e.key === 'Enter' && handleAddWord()}
            />
            <button 
                onClick={handleAddWord}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center gap-2"
            >
                <Plus className="w-4 h-4" /> Adicionar
            </button>
        </div>

        <div className="space-y-2">
            {words.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                    Nenhuma palavra configurada.
                </div>
            )}
            {words.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100 group">
                    <div className="flex items-center gap-3">
                        <ShieldAlert className="w-5 h-5 text-red-500" />
                        <span className="font-medium text-slate-700">{item.word}</span>
                    </div>
                    <button 
                        onClick={() => handleDelete(item.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 p-2"
                        title="Remover"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};
