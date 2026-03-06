import { type Conversation, type Message } from '../types';

const mockSalespersons = [
  { id: '1', name: 'Ana Silva' },
  { id: '2', name: 'Bruno Costa' },
  { id: '3', name: 'Carla Dias' },
];

const generateMockConversations = (count: number): Conversation[] => {
  const conversations: Conversation[] = [];
  const statuses: ('active' | 'closed')[] = ['active', 'closed'];
  const clientNames = ['Cliente A', 'Cliente B', 'Cliente C', 'Cliente D', 'Cliente E'];

  for (let i = 0; i < count; i++) {
    const id = `conv-${i + 1}`;
    const clientName = clientNames[Math.floor(Math.random() * clientNames.length)];
    const salesperson = mockSalespersons[Math.floor(Math.random() * mockSalespersons.length)];
    const status: 'active' | 'closed' = statuses[Math.floor(Math.random() * statuses.length)];
    const date = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(); // Last 30 days
    const lastMessage = `Última mensagem da conversa ${i + 1}.`;

    const messages = Array.from({ length: Math.floor(Math.random() * 10) + 3 }).map((_, msgIdx) => {
      const sender = msgIdx % 2 === 0 ? 'salesperson' : 'client';
      const msgTimestamp = new Date(new Date(date).getTime() + msgIdx * 60 * 1000).toISOString();
      return {
        id: `msg-${id}-${msgIdx}`,
        sender: sender,
        text: `Mensagem ${msgIdx + 1} de ${sender === 'salesperson' ? salesperson.name : clientName}.`,
        timestamp: msgTimestamp,
      };
    });

    conversations.push({
      id: id,
      clientName: clientName,
      salespersonId: salesperson.id,
      salespersonName: salesperson.name,
      status: status,
      date: date,
      lastMessage: lastMessage,
      messages: messages as Message[],
    });
  }
  return conversations;
};

let MOCK_CONVERSATIONS = generateMockConversations(50);

export const mockFetchConversations = async (
  salespersonId?: string,
  startDate?: string,
  endDate?: string
): Promise<Conversation[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay

  let filteredConversations = [...MOCK_CONVERSATIONS];

  if (salespersonId) {
    filteredConversations = filteredConversations.filter(
      (conv) => conv.salespersonId === salespersonId
    );
  }

  if (startDate) {
    const start = new Date(startDate);
    filteredConversations = filteredConversations.filter(
      (conv) => new Date(conv.date) >= start
    );
  }

  if (endDate) {
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // Include end date fully
    filteredConversations = filteredConversations.filter(
      (conv) => new Date(conv.date) <= end
    );
  }

  return filteredConversations;
};

export const mockFetchConversationById = async (id: string): Promise<Conversation | null> => {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
  const conversation = MOCK_CONVERSATIONS.find((conv) => conv.id === id);
  return conversation || null;
};

export const mockFetchSalespersons = async (): Promise<{ id: string; name: string }[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate network delay
  return mockSalespersons;
};
