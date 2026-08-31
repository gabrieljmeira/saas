# FETCHLEADS DESIGN SYSTEM

## BRAND ASSETS & PRODUCT STATES

A marca principal do FetchLeads possui ativos reais que devem ser usados em substituição a placeholders genéricos (como "FL"). Esses ativos não são apenas decorativos; eles fazem parte da assinatura visual e representam inteligência de processamento durante a jornada do usuário.

### ASSETS REAIS ENCONTRADOS
- **Logo Padrão (Wordmark + Símbolo)**: `/logonavbar.avif` 
- **Logo de Estado (Loading/Searching/Processing)**: `/logoloading.telavazia.avif`

*(Nota: O avatar do usuário pode utilizar iniciais, mas a logo oficial do FetchLeads deve usar sempre a versão autêntica da marca).*

### COMPONENTE CENTRAL (`FetchLeadsLogo`)
Todas as instâncias da marca devem usar o componente `<FetchLeadsLogo state="default | searching | loading | processing" />`. Isso centraliza a imagem, proporções adequadas e as variações de estado no mesmo componente, evitando que tenhamos implementações duplicadas em Header, Login, Sidebar, etc.

### QUANDO USAR AS VARIANTES DE ESTADO
Os estados (searching, loading, processing) representam momentos que agregam inteligência e contextualização para as operações do usuário, aplicando a animação de pulso e troca visual:

- **Searching (`state="searching"`)**: Deve ser usado *somente* quando a aplicação estiver executando uma busca real por Leads (ex: scraping ou busca em API de fornecedores). Acompanhar de label claro: "Buscando empresas em [Local]...".
- **Processing (`state="processing"`)**: Deve ser usado para ações centrais da inteligência do FetchLeads, como cálculo de Lead Score, enriquecimento de dados ou geração de abordagens (mensagens AI). Acompanhar de label: "Analisando oportunidades..."
- **Loading (`state="loading"`)**: Carregamentos cruciais de sistema, como initial boot ou transições massivas de tela (não substitui Skeletons para tabelas/listas).

### QUANDO NÃO USAR
- **Empty States**: Um painel vazio não está carregando nada. Não use as logos animadas de loading em estados "Zero".
- **Micro-Loadings**: Ao clicar em "Salvar" ou em ações rápidas de botão, utilize *spinners* convencionais (Level 1).
- **Processos Imediatos**: Se a busca termina em milissegundos, não crie um delay artificial apenas para mostrar a animação da marca.
- **Skeletons**: Para carregamentos de listas, tabelas e feeds, continue utilizando a UI de skeleton para não causar fadiga visual com excesso de motion na logo.

### HIERARQUIA DE LOADING DEFINIDA
1. **LEVEL 1 (Micro)**: Button spinners, pequenos progresso. (Ação pontual).
2. **LEVEL 2 (Component)**: Skeletons, text-shimmer. (Carregamento de drawer, tabelas).
3. **LEVEL 3 (Product Process)**: *Branded Product Process* com a logo animada do FetchLeads (Ação core como busca de leads e inteligência AI).
