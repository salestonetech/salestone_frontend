import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, BarChart3, AlertTriangle, ShieldAlert } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/conversations', icon: MessageSquare, label: 'Conversas' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/objections', icon: AlertTriangle, label: 'Objeções' },
  { to: '/forbidden-words', icon: ShieldAlert, label: 'Palavras Proibidas' },
];

export const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col">
      <div className="p-6 border-b border-slate-100">
        <h1 className="text-2xl font-bold text-primary-600 flex items-center gap-2">
          Sales Tony
        </h1>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                isActive
                  ? 'bg-primary-50 text-primary-700 font-medium'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              )
            }
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold">
                M
            </div>
            <div>
                <p className="text-sm font-medium text-slate-700">Manager</p>
                <p className="text-xs text-slate-500">Sales Manager</p>
            </div>
        </div>
      </div>
    </div>
  );
};
