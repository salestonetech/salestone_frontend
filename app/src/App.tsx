import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { Conversations } from './pages/Conversations';
import { ConversationDetails } from './pages/ConversationDetails';
import { MessageSquare } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/conversations" className="flex items-center gap-2 font-semibold text-slate-900 text-lg hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white">
              <MessageSquare className="w-5 h-5" />
            </div>
            Salestone
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/conversations" element={<Conversations />} />
          <Route path="/conversations/:id" element={<ConversationDetails />} />
          <Route path="/" element={<Navigate to="/conversations" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
