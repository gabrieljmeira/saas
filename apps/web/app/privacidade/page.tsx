import { LegalLayout } from "@/components/legal/legal-layout";
import { legalConfig } from "@/lib/legal/legal-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Política de Privacidade — ${legalConfig.brandName}`,
  description: `Saiba como o ${legalConfig.brandName} coleta, utiliza e protege os seus dados pessoais.`,
};

export default function PrivacidadePage() {
  return (
    <LegalLayout title="Política de Privacidade">
      <h2>1. Introdução</h2>
      <p>
        A sua privacidade é fundamental para o <strong>{legalConfig.brandName}</strong>. Esta Política de Privacidade explica como coletamos, 
        usamos, armazenamos e protegemos os seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
      </p>

      <h2>2. Controlador de Dados</h2>
      <p>
        O responsável pelo tratamento (Controlador) dos seus dados pessoais é {legalConfig.legalEntity}, 
        inscrita no {legalConfig.cnpj}. Em caso de dúvidas sobre privacidade, entre em contato pelo e-mail: 
        <strong> {legalConfig.privacyEmail}</strong>.
      </p>

      <h2>3. Dados que Coletamos e Finalidades</h2>
      
      <h3>3.1. Dados de Conta e Autenticação</h3>
      <p>
        Coletamos seu nome e endereço de e-mail ao criar uma conta para lhe conceder acesso, prestar o serviço 
        e realizar o gerenciamento da sua assinatura. A autenticação é provida de forma segura, utilizando cookies estritamente necessários para manter sua sessão ativa (Supabase Auth).
      </p>

      <h3>3.2. Dados Inseridos no CRM e Leads</h3>
      <p>
        O {legalConfig.brandName} permite que você organize informações de empresas (Leads) e potenciais clientes. 
        Nós tratamos estes dados <strong>na condição de Operador</strong>. Cabe a você (o usuário) atuar como Controlador 
        destes dados perante os terceiros prospectados, garantindo que a obtenção de tais contatos tenha uma base legal válida.
      </p>

      <h3>3.3. Dados de Uso e Técnicos</h3>
      <p>
        Coletamos logs de acesso (IP, navegador, data e hora) para fins de segurança, estabilidade técnica e prevenção de fraudes. 
        Também podemos coletar métricas de navegação para entender como o serviço é utilizado e implementar melhorias.
      </p>

      <h2>4. Bases Legais</h2>
      <p>
        Tratamos seus dados pessoais com base em:
      </p>
      <ul>
        <li><strong>Execução de Contrato:</strong> para gerenciar sua conta e fornecer as ferramentas do software;</li>
        <li><strong>Obrigação Legal:</strong> retenção de logs de acesso conforme o Marco Civil da Internet (Lei nº 12.965/2014);</li>
        <li><strong>Legítimo Interesse:</strong> para melhorar a plataforma, proteger nossos sistemas contra fraudes e enviar comunicações estritamente relacionadas ao produto.</li>
      </ul>

      <h2>5. Inteligência Artificial e Dados Compartilhados</h2>
      <p>
        A funcionalidade "Insight IA" e a geração de abordagens utilizam modelos de terceiros (como a OpenAI). 
        As informações públicas do negócio alvo (site, descrição do lead) podem ser enviadas para esses provedores 
        estritamente para a geração do texto. Nossos fornecedores de IA não utilizam seus dados privados ou credenciais 
        para treinar modelos públicos.
      </p>

      <h2>6. A Comunidade</h2>
      <p>
        Caso você participe ativamente da comunidade interna, as informações, dicas e templates que você decidir compartilhar 
        ficarão visíveis para outros usuários da plataforma. Recomendamos que você nunca insira dados pessoais de seus leads nas publicações públicas.
      </p>

      <h2>7. Nossos Fornecedores (Operadores)</h2>
      <p>
        Para entregar o {legalConfig.brandName}, compartilhamos dados estritamente necessários com provedores de tecnologia e infraestrutura:
      </p>
      <ul>
        <li><strong>Supabase:</strong> gerenciamento de banco de dados e autenticação segura;</li>
        <li><strong>Vercel:</strong> hospedagem e infraestrutura;</li>
        <li><strong>Provedores de IA (ex: OpenAI):</strong> análise de leads e geração de textos;</li>
        <li>[GATEWAY DE PAGAMENTO A DEFINIR]: processamento financeiro das assinaturas.</li>
      </ul>
      <p>
        Estes fornecedores podem operar servidores fora do Brasil (Transferência Internacional). Selecionamos parceiros 
        que adotam altos padrões de conformidade técnica e jurídica.
      </p>

      <h2>8. Cookies e Tecnologias de Rastreamento</h2>
      <p>
        Utilizamos <strong>Cookies Essenciais</strong> para manter sua sessão (login) ativa e garantir a segurança do ambiente restrito. 
        Também podemos utilizar <strong>Cookies de Analytics</strong> para fins estatísticos (de forma agregada e anônima). 
        Você pode gerenciar as permissões não-essenciais nas configurações do seu navegador.
      </p>

      <h2>9. Retenção e Segurança</h2>
      <p>
        Armazenamos seus dados enquanto a sua conta estiver ativa ou pelo tempo necessário para cumprir obrigações legais, 
        prevenir fraudes e resolver disputas. Adotamos medidas razoáveis (criptografia de dados em trânsito e em repouso, políticas de acesso) 
        para proteger as suas informações. Nenhuma transmissão pela internet, porém, é 100% à prova de falhas.
      </p>

      <h2>10. Exclusão de Conta</h2>
      <p>
        Você poderá solicitar a exclusão da sua conta através da plataforma. Uma vez excluída, os dados vinculados ao seu CRM 
        (leads e anotações) serão apagados, ressalvada a retenção de logs exigidos por lei. (<em>Pendência técnica: o fluxo automatizado 
        de exclusão completa ainda será implementado nativamente no painel. Contate o suporte caso deseje solicitar a exclusão manual imediata.</em>)
      </p>

      <h2>11. Os Seus Direitos (LGPD)</h2>
      <p>
        Você tem o direito de:
      </p>
      <ul>
        <li>Confirmar a existência de tratamento e acessar seus dados;</li>
        <li>Corrigir dados incompletos ou desatualizados;</li>
        <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários;</li>
        <li>Revogar consentimento (quando aplicável);</li>
        <li>Obter informações sobre compartilhamentos.</li>
      </ul>
      <p>
        Para exercer qualquer um desses direitos, envie um e-mail para <strong>{legalConfig.privacyEmail}</strong>.
      </p>

      <h2>12. Alterações desta Política</h2>
      <p>
        Podemos revisar esta Política de Privacidade de tempos em tempos. Quando fizermos alterações materiais, 
        publicaremos a nova versão nesta página, atualizando a data no topo do documento.
      </p>
    </LegalLayout>
  );
}
