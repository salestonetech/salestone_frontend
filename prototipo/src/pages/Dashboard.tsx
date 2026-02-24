import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { MessageSquare, Users, AlertTriangle, ShieldAlert, ArrowUp, ArrowDown } from 'lucide-react';
import { mockStats, messagesPerDayData, objectionsPerWeekData, sentimentData } from '../data/mockData';

const COLORS = ['#10b981', '#64748b', '#ef4444'];

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500">Visão geral da performance do time de vendas.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Mensagens" 
          value={mockStats.totalMessages.toLocaleString()} 
          icon={MessageSquare} 
          trend="+12%" 
          trendUp={true}
          color="blue"
        />
        <StatCard 
          title="Conversas Ativas" 
          value={mockStats.totalConversations.toString()} 
          icon={Users} 
          trend="+5%" 
          trendUp={true}
          color="indigo"
        />
        <StatCard 
          title="Objeções Identificadas" 
          value={mockStats.objectionsIdentified.toString()} 
          icon={AlertTriangle} 
          trend="-2%" 
          trendUp={false} 
          color="amber"
          inverseTrend
        />
        <StatCard 
          title="Alertas de Palavras" 
          value={mockStats.forbiddenWordsTriggered.toString()} 
          icon={ShieldAlert} 
          trend="-5%" 
          trendUp={false}
          color="red"
          inverseTrend
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Messages per Day */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Mensagens por Dia</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={messagesPerDayData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="messages" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4, fill: '#0ea5e9', strokeWidth: 0 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Objections per Week */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Objeções por Semana</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={objectionsPerWeekData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f1f5f9' }} 
                />
                <Bar dataKey="objections" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sentiment Analysis */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2">
           <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="w-full md:w-1/3">
                 <h3 className="text-lg font-semibold text-slate-800 mb-2">Análise de Sentimento</h3>
                 <p className="text-slate-500 text-sm mb-4">Distribuição do sentimento nas conversas analisadas.</p>
                 <div className="space-y-3">
                    {sentimentData.map((item, index) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                          <span className="text-sm font-medium text-slate-700">{item.name}</span>
                        </div>
                        <span className="text-sm font-bold text-slate-900">{item.value}%</span>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="w-full md:w-2/3 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sentimentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {sentimentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  trend: string;
  trendUp: boolean;
  color: 'blue' | 'indigo' | 'amber' | 'red';
  inverseTrend?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend, trendUp, color, inverseTrend }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    indigo: 'bg-indigo-50 text-indigo-600',
    amber: 'bg-amber-50 text-amber-600',
    red: 'bg-red-50 text-red-600',
  };

  const isPositive = inverseTrend ? !trendUp : trendUp;
  const trendColor = isPositive ? 'text-emerald-600' : 'text-red-600';
  const TrendIcon = trendUp ? ArrowUp : ArrowDown;

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${trendColor} bg-slate-50 px-2 py-1 rounded-full`}>
          <TrendIcon className="w-3 h-3" />
          {trend}
        </div>
      </div>
      <div>
        <p className="text-slate-500 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
      </div>
    </div>
  );
};
