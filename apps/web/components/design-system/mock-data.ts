export type LeadStatus =
  | "novo"
  | "contatado"
  | "aguardando"
  | "follow_up"
  | "proposta"
  | "fechado"
  | "perdido";

export interface Lead {
  id: string;
  company: string;
  niche: string;
  city: string;
  rating: number;
  reviews: number;
  hasWebsite: boolean;
  hasInstagram: boolean;
  opportunityScore: number;
  status: LeadStatus;
  nextAction: string;
  reasons: string[];
  suggestedApproach: string;
}

export const MOCK_LEADS: Lead[] = [
  {
    id: "1",
    company: "Burger & Co. Gravataí",
    niche: "Hamburgueria",
    city: "Gravataí",
    rating: 4.8,
    reviews: 312,
    hasWebsite: false,
    hasInstagram: true,
    opportunityScore: 92,
    status: "novo",
    nextAction: "Ligar",
    reasons: [
      "Sem site",
      "Alta avaliação",
      "Instagram ativo mas sem delivery próprio",
    ],
    suggestedApproach:
      "Olá! Vi que o Burger & Co é muito bem avaliado, mas notei que vocês não têm um site para pedidos diretos. Isso deve estar fazendo vocês pagarem muita taxa para apps...",
  },
  {
    id: "2",
    company: "Pizzaria do Chef",
    niche: "Pizzaria",
    city: "Cachoeirinha",
    rating: 4.5,
    reviews: 185,
    hasWebsite: true,
    hasInstagram: true,
    opportunityScore: 78,
    status: "follow_up",
    nextAction: "Mandar WhatsApp",
    reasons: ["Site desatualizado", "Muitas avaliações recentes"],
    suggestedApproach:
      "Tudo bem? Falei com você semana passada sobre a renovação do site da Pizzaria...",
  },
  {
    id: "3",
    company: "Restaurante Sabor Caseiro",
    niche: "Restaurante",
    city: "Gravataí",
    rating: 4.1,
    reviews: 89,
    hasWebsite: false,
    hasInstagram: false,
    opportunityScore: 65,
    status: "contatado",
    nextAction: "Aguardar resposta",
    reasons: ["Presença digital quase nula", "Avaliação média"],
    suggestedApproach:
      "Olá, percebi que o Sabor Caseiro não está no Instagram. Hoje em dia isso é essencial para atrair clientes no horário de almoço...",
  },
  {
    id: "4",
    company: "Sushi Express",
    niche: "Sushi",
    city: "Porto Alegre",
    rating: 4.9,
    reviews: 540,
    hasWebsite: true,
    hasInstagram: true,
    opportunityScore: 40,
    status: "perdido",
    nextAction: "Nenhuma",
    reasons: ["Já possui sistema próprio", "Baixo interesse"],
    suggestedApproach: "",
  },
  {
    id: "5",
    company: "Bistrô da Praça",
    niche: "Bistrô",
    city: "Cachoeirinha",
    rating: 4.7,
    reviews: 210,
    hasWebsite: false,
    hasInstagram: true,
    opportunityScore: 88,
    status: "proposta",
    nextAction: "Reunião de fechamento",
    reasons: [
      "Aceitou proposta preliminar",
      "Precisa de cardápio digital urgente",
    ],
    suggestedApproach:
      "Confirmando nossa call amanhã às 14h para repassarmos os detalhes do contrato.",
  },
  {
    id: "6",
    company: "Churrascaria Gauchão",
    niche: "Churrascaria",
    city: "Gravataí",
    rating: 4.3,
    reviews: 890,
    hasWebsite: true,
    hasInstagram: true,
    opportunityScore: 85,
    status: "fechado",
    nextAction: "Onboarding",
    reasons: ["Venda concluída"],
    suggestedApproach: "",
  },
];
