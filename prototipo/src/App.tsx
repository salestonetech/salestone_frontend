import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './layouts/Layout';
import { Dashboard } from './pages/Dashboard';
import { Conversations } from './pages/Conversations';
import { ConversationDetails } from './pages/ConversationDetails';
import { Analytics } from './pages/Analytics';
import { Objections } from './pages/Objections';
import { ForbiddenWords } from './pages/ForbiddenWords';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="conversations" element={<Conversations />} />
          <Route path="conversations/:id" element={<ConversationDetails />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="objections" element={<Objections />} />
          <Route path="forbidden-words" element={<ForbiddenWords />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
