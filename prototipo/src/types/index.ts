export interface Message {
  id: string;
  text: string;
  sender: 'client' | 'salesperson';
  timestamp: string;
}

export interface Conversation {
  id: string;
  clientName: string;
  salespersonName: string;
  lastMessage: string;
  date: string;
  status: 'active' | 'closed';
  messages: Message[];
  unreadCount?: number;
}

export interface Objection {
  id: string;
  name: string;
  count: number;
  example: string;
  suggestion: string;
}

export interface ForbiddenWord {
  id: string;
  word: string;
}

export interface DashboardStats {
  totalMessages: number;
  totalConversations: number;
  objectionsIdentified: number;
  forbiddenWordsTriggered: number;
}
