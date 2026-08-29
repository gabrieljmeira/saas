import { LegalLayout } from "@/components/legal/legal-layout";
import { legalConfig } from "@/lib/legal/legal-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Termos de Uso — ${legalConfig.brandName}`,
  description: `Termos de Uso e Condições de Serviço do ${legalConfig.brandName}.`,
};

export default function TermosPage() {
  return (
    <LegalLayout title="Termos de Uso">
      <h2>1. Introdução e Aceitação dos Termos</h2>
      <p>
        Bem-vindo ao <strong>{legalConfig.brandName}</strong>. Estes Termos de Uso regulam o acesso e a utilização 
        da plataforma, disponibilizada por {legalConfig.legalEntity}, inscrita no {legalConfig.cnpj}. Ao criar uma 
        conta e utilizar o {legalConfig.brandName}, você concorda expressamente com as condições aqui estabelecidas.
      </p>

      <h2>2. Sobre o FetchLeads</h2>
      <p>
        O {legalConfig.brandName} é um software como serviço (SaaS) voltado para profissionais e empresas (B2B) que 
        buscam identificar negócios locais, organizar processos de prospecção em um Mini CRM e obter sugestões de 
        abordagem.
      </p>

      <h2>3. Cadastro e Conta</h2>
      <p>
        Para utilizar a plataforma, você deverá criar uma conta fornecendo informações precisas e mantendo-as atualizadas. 
        A responsabilidade pela segurança das credenciais de acesso é exclusiva do usuário. Você compromete-se a notificar 
        imediatamente o {legalConfig.brandName} em caso de uso não autorizado da sua conta.
      </p>

      <h2>4. Uso Permitido e Proibido</h2>
      <p>
        O {legalConfig.brandName} deve ser utilizado estritamente para finalidades comerciais legítimas. É 
        <strong> terminantemente proibido</strong> utilizar a plataforma para:
      </p>
      <ul>
        <li>Enviar spam, mensagens em massa não solicitadas ou qualquer comunicação ilegal;</li>
        <li>Praticar phishing, fraudes, assédio, extorsão ou falsidade ideológica;</li>
        <li>Coletar, tratar ou armazenar dados pessoais de maneira ilícita;</li>
        <li>Violar direitos autorais, marcas ou direitos de terceiros;</li>
        <li>Tentar acessar áreas restritas do sistema, realizar engenharia reversa ou explorar vulnerabilidades;</li>
        <li>Abusar das nossas APIs ou sobrecarregar nossos servidores.</li>
      </ul>

      <h2>5. Prospecção Comercial e Responsabilidade do Usuário</h2>
      <p>
        O {legalConfig.brandName} atua apenas como uma ferramenta que facilita a organização de contatos. 
        <strong> O usuário é o único responsável </strong> por decidir com quem entrar em contato, pela redação e 
        envio das mensagens e pelo cumprimento integral da legislação de proteção de dados (como a LGPD) e regras de defesa do consumidor.
      </p>
      <p>
        O simples fato de um dado estar disponível publicamente ou ser organizado pelo {legalConfig.brandName} não concede 
        ao usuário o direito irrestrito de utilizá-lo sem observar o direito de oposição e as boas práticas de mercado.
      </p>

      <h2>6. Integração e Uso do WhatsApp</h2>
      <p>
        O {legalConfig.brandName} <strong>não tem qualquer afiliação, representação ou parceria com a Meta Platforms, Inc. ou o WhatsApp</strong>. 
        A funcionalidade "WhatsApp em 1 clique" apenas prepara o texto e facilita a abertura do aplicativo de mensagens.
      </p>
      <p>
        O {legalConfig.brandName} não garante:
      </p>
      <ul>
        <li>A entrega, leitura ou resposta das mensagens;</li>
        <li>A conversão ou fechamento de vendas;</li>
        <li>Que o número do usuário não será bloqueado pelo WhatsApp caso este viole os termos da referida rede.</li>
      </ul>

      <h2>7. Uso de Inteligência Artificial</h2>
      <p>
        A plataforma pode utilizar modelos de Inteligência Artificial para gerar <em>insights</em> e sugestões de 
        abordagem ("Insight IA"). O usuário reconhece que as análises feitas por IA podem conter imprecisões ou erros. 
        É dever do usuário revisar todas as sugestões antes de utilizá-las comercialmente. A IA não substitui o 
        julgamento humano e não damos garantias quanto aos resultados oriundos das abordagens sugeridas.
      </p>

      <h2>8. Comunidade</h2>
      <p>
        O {legalConfig.brandName} pode oferecer uma área de comunidade, onde usuários 
        compartilham estratégias, resultados e templates de prospecção.
      </p>
      <ul>
        <li>É proibido expor dados de leads reais (telefone, email, nome de responsáveis) na comunidade. Resultados devem ser anonimizados.</li>
        <li>A tag "Resultado Verificado" significa apenas que a conquista possui compatibilidade com registros inseridos no próprio CRM da plataforma, não constituindo auditoria fiscal, financeira ou garantia de faturamento absoluto.</li>
        <li>O conteúdo compartilhado pelo usuário pode ser acessado por outros membros da plataforma.</li>
      </ul>

      <h2>9. Assinaturas, Planos e Cancelamento</h2>
      <p>
        [INFORMAÇÕES SOBRE PAGAMENTOS E ASSINATURAS DEVERÃO SER PREENCHIDAS AQUI QUANDO A PLATAFORMA POSSUIR PLANOS PAGOS]. 
        No momento, as condições de trial e cobrança seguem as informações dispostas no ato de contratação. O usuário 
        pode solicitar o encerramento de sua conta a qualquer momento.
      </p>

      <h2>10. Disponibilidade e Alterações do Serviço</h2>
      <p>
        O {legalConfig.brandName} é fornecido "no estado em que se encontra". Esforçamo-nos para garantir alta disponibilidade, 
        porém não garantimos que a plataforma estará ininterrupta ou livre de erros. Reservamo-nos o direito de alterar, 
        suspender ou descontinuar funcionalidades a qualquer momento.
      </p>

      <h2>11. Limitação de Responsabilidade</h2>
      <p>
        Na extensão máxima permitida por lei, o {legalConfig.brandName} não será responsabilizado por lucros cessantes, 
        perda de dados, bloqueios em plataformas de terceiros (como WhatsApp) ou danos indiretos resultantes do uso ou da 
        impossibilidade de uso da plataforma.
      </p>

      <h2>12. Alterações dos Termos</h2>
      <p>
        Estes Termos podem ser atualizados periodicamente. Alterações significativas serão comunicadas através da 
        plataforma ou por e-mail. O uso continuado após a alteração constitui aceitação dos novos Termos.
      </p>

      <h2>13. Contato</h2>
      <p>
        Para dúvidas sobre estes Termos de Uso, entre em contato através de: {legalConfig.supportEmail}.
      </p>
    </LegalLayout>
  );
}
