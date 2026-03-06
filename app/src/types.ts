export interface Salesperson {
  id: string;
  name: string;
}

export interface Message {
  id: string;
  sender: 'salesperson' | 'client';
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  clientName: string;
  salespersonId: string;
  salespersonName: string;
  status: 'active' | 'closed';
  date: string; // e.g. "2024-01-15 14:30"
  lastMessage: string;
  messages: Message[];
}
