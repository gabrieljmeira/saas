# FETCHLEADS DESIGN SYSTEM

## BRAND ASSETS & PRODUCT STATES

A marca principal do FetchLeads possui ativos reais que devem ser usados em substituição a placeholders genéricos (como "FL"). Esses ativos não são apenas decorativos; eles fazem parte da assinatura visual e representam inteligência de processamento durante a jornada do usuário.

### ASSETS REAIS ENCONTRADOS

- **Logo Padrão (Wordmark + Símbolo)**: `/logonavbar.avif`
- **Logo de Estado (Loading/Searching/Processing)**: `/logoloading.telavazia.avif`

_(Nota: O avatar do usuário pode utilizar iniciais, mas a logo oficial do FetchLeads deve usar sempre a versão autêntica da marca)._

### COMPONENTE CENTRAL (`FetchLeadsLogo`)

Todas as instâncias da marca devem usar o componente `<FetchLeadsLogo state="default | searching | loading | processing" />`. Isso centraliza a imagem, proporções adequadas e as variações de estado no mesmo componente, evitando que tenhamos implementações duplicadas em Header, Login, Sidebar, etc.

### QUANDO USAR AS VARIANTES DE ESTADO

Os estados (searching, loading, processing) representam momentos que agregam inteligência e contextualização para as operações do usuário, aplicando a animação de pulso e troca visual:

- **Searching (`state="searching"`)**: Deve ser usado _somente_ quando a aplicação estiver executando uma busca real por Leads (ex: scraping ou busca em API de fornecedores). Acompanhar de label claro: "Buscando empresas em [Local]...".
- **Processing (`state="processing"`)**: Deve ser usado para ações centrais da inteligência do FetchLeads, como cálculo de Lead Score, enriquecimento de dados ou geração de abordagens (mensagens AI). Acompanhar de label: "Analisando oportunidades..."
- **Loading (`state="loading"`)**: Carregamentos cruciais de sistema, como initial boot ou transições massivas de tela (não substitui Skeletons para tabelas/listas).

### QUANDO NÃO USAR

- **Empty States**: Um painel vazio não está carregando nada. Não use as logos animadas de loading em estados "Zero".
- **Micro-Loadings**: Ao clicar em "Salvar" ou em ações rápidas de botão, utilize _spinners_ convencionais (Level 1).
- **Processos Imediatos**: Se a busca termina em milissegundos, não crie um delay artificial apenas para mostrar a animação da marca.
- **Skeletons**: Para carregamentos de listas, tabelas e feeds, continue utilizando a UI de skeleton para não causar fadiga visual com excesso de motion na logo.

### HIERARQUIA DE LOADING DEFINIDA

1. **LEVEL 1 (Micro)**: Button spinners, pequenos progresso. (Ação pontual).
2. **LEVEL 2 (Component)**: Skeletons, text-shimmer. (Carregamento de drawer, tabelas).
3. **LEVEL 3 (Product Process)**: _Branded Product Process_ com a logo animada do FetchLeads (Ação core como busca de leads e inteligência AI).


==================================================
PRICING & BILLING UI
==================================================

- **Pricing Structure**: 3 main plans (Free, Freelancer, Agency) + 3 standalone credit packages (8, 20, 40).
- **Monthly/Annual Toggle**: A client-side segmented control toggle switching between Monthly and Annual modes. Annual displays discount and price equivalent.
- **Highlighted Plan**: Freelancer is the recommended tier. Highlighted with purple borders, gradients, and a "Mais popular" badge.
- **Credit Cards**: Below the main plans. Simple grid indicating the cost per extra search.
- **CTA Behavior**: Free -> `/signup` or `/dashboard`. Paid -> Paddle Checkout (if authenticated) or `/login?next=/?checkout=...` (if unauthenticated).
- **Visual Relation with Hero**: Uses the same `bg-slate-950` with purple glow (`bg-purple-600/10 blur-[120px]`), slate borders (`border-slate-800`), and typography rules to look unified. No generic white cards.


==================================================
APP HEADER & ACCOUNT MENU
==================================================

- **Header Height**: Compacto, fixo em `h-16` (64px).
- **Surfaces**: O Header principal utiliza `bg-surface` e `border-b border-border-subtle`, mantendo integrauo total com a Sidebar (nuo ho duplicauo da logo em telas Desktop, o header comea *aps* a sidebar).
- **Account Trigger**: A orea do usuorio ? minimalista e refinada, incluindo Nome, Badge (se STAFF/OWNER), Iniciais/Avatar e Chevron (`w-3.5 h-3.5`). Possui hover sutil (`hover:bg-surface-hover`) e focus ring (`focus-visible:ring-primary/50`).
- **Account Dropdown**: Componente client-side construdo sobre o `@base-ui/react/menu` (Shadcn Dropdown Menu). Layout de `256px` (`w-64`) de largura.
- **Role Display**: "USER" nuo exibe label (comportamento clean). "STAFF" exibe "Equipe FetchLeads" e "OWNER" exibe "Conta oficial", ambos com cone `BadgeCheck` roxo. Evita nomes t?cnicos de backend expostos.
- **Mobile Behavior**: Em resolues baixas (`md:hidden`), o hamburger menu e a Logo suo exibidos no Header, enquanto no Account Trigger o Nome � ocultado e apenas o Avatar+Chevron permanecem.

