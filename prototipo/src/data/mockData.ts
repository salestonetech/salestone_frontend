import type { Conversation, DashboardStats, ForbiddenWord, Objection } from '../types';

export const mockConversations: Conversation[] = [
  {
    id: '1',
    clientName: 'Roberto Silva',
    salespersonName: 'Ana Souza',
    lastMessage: 'Vou pensar e te retorno.',
    date: '2023-10-25 14:30',
    status: 'active',
    messages: [
      { id: 'm1', text: 'Olá, gostaria de saber mais sobre o plano Enterprise.', sender: 'client', timestamp: '14:00' },
      { id: 'm2', text: 'Oi Roberto! Claro, o plano Enterprise inclui...', sender: 'salesperson', timestamp: '14:05' },
      { id: 'm3', text: 'Entendi, mas achei o preço um pouco alto.', sender: 'client', timestamp: '14:10' },
      { id: 'm4', text: 'Entendo sua preocupação. Mas considerando o ROI...', sender: 'salesperson', timestamp: '14:12' },
      { id: 'm5', text: 'Vou pensar e te retorno.', sender: 'client', timestamp: '14:30' },
    ]
  },
  {
    id: '2',
    clientName: 'Juliana Costa',
    salespersonName: 'Carlos Oliveira',
    lastMessage: 'Fechado! Pode me enviar o contrato?',
    date: '2023-10-25 11:15',
    status: 'closed',
    messages: [
      { id: 'm1', text: 'Bom dia, Carlos. Conseguimos fechar naquele valor?', sender: 'client', timestamp: '10:00' },
      { id: 'm2', text: 'Bom dia Juliana! Sim, consegui a aprovação.', sender: 'salesperson', timestamp: '10:15' },
      { id: 'm3', text: 'Fechado! Pode me enviar o contrato?', sender: 'client', timestamp: '11:15' },
    ]
  },
  {
    id: '3',
    clientName: 'Marcos Santos',
    salespersonName: 'Ana Souza',
    lastMessage: 'Não tenho interesse no momento.',
    date: '2023-10-24 16:45',
    status: 'closed',
    messages: [
      { id: 'm1', text: 'Olá Marcos, aqui é a Ana da Sales Tony.', sender: 'salesperson', timestamp: '16:00' },
      { id: 'm2', text: 'Não tenho interesse no momento.', sender: 'client', timestamp: '16:45' },
    ]
  },
   {
    id: '4',
    clientName: 'Fernanda Lima',
    salespersonName: 'Carlos Oliveira',
    lastMessage: 'Qual o prazo de implementação?',
    date: '2023-10-24 09:30',
    status: 'active',
    messages: [
        { id: 'm1', text: 'Gostei da proposta.', sender: 'client', timestamp: '09:00' },
        { id: 'm2', text: 'Fico feliz! Vamos prosseguir?', sender: 'salesperson', timestamp: '09:10' },
        { id: 'm3', text: 'Qual o prazo de implementação?', sender: 'client', timestamp: '09:30' },
    ]
  }
];

export const mockStats: DashboardStats = {
  totalMessages: 12450,
  totalConversations: 342,
  objectionsIdentified: 87,
  forbiddenWordsTriggered: 12,
};

export const mockObjections: Objection[] = [
  {
    id: '1',
    name: 'Preço',
    count: 45,
    example: 'Achei o valor muito alto para o meu orçamento atual.',
    suggestion: 'Ressalte o valor agregado e o retorno sobre o investimento (ROI). Ofereça condições de pagamento flexíveis se possível.'
  },
  {
    id: '2',
    name: 'Tempo/Timing',
    count: 22,
    example: 'Agora não é um bom momento, me ligue mês que vem.',
    suggestion: 'Pergunte o que mudaria no próximo mês. Crie senso de urgência com benefícios que eles estão perdendo agora.'
  },
  {
    id: '3',
    name: 'Concorrência',
    count: 15,
    example: 'O concorrente X ofereceu mais barato.',
    suggestion: 'Foque nos diferenciais exclusivos da nossa solução. Não entre em guerra de preços, mas em guerra de valor.'
  },
  {
    id: '4',
    name: 'Confiança',
    count: 5,
    example: 'Não conheço a empresa de vocês.',
    suggestion: 'Apresente cases de sucesso e depoimentos de clientes do mesmo setor. Ofereça uma prova de conceito.'
  }
];

export const mockForbiddenWords: ForbiddenWord[] = [
  { id: '1', word: 'Garantia absoluta' },
  { id: '2', word: 'De graça' },
  { id: '3', word: 'Sem custo algum' },
  { id: '4', word: 'Impossível dar errado' },
];

export const messagesPerDayData = [
  { name: 'Seg', messages: 120 },
  { name: 'Ter', messages: 150 },
  { name: 'Qua', messages: 180 },
  { name: 'Qui', messages: 220 },
  { name: 'Sex', messages: 170 },
  { name: 'Sab', messages: 90 },
  { name: 'Dom', messages: 50 },
];

export const objectionsPerWeekData = [
  { name: 'Semana 1', objections: 12 },
  { name: 'Semana 2', objections: 19 },
  { name: 'Semana 3', objections: 15 },
  { name: 'Semana 4', objections: 22 },
];

export const sentimentData = [
  { name: 'Positivo', value: 65 },
  { name: 'Neutro', value: 25 },
  { name: 'Negativo', value: 10 },
];
