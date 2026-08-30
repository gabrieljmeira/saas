export interface ApproachContext {
  name: string;
  niche?: string | null;
  city?: string | null;
  website?: string | null;
  scoreReasons?: { label: string }[];
}

export interface GeneratedApproach {
  success: boolean;
  approach?: string;
  error?: string;
}

export interface ApproachGenerator {
  providerName: string;
  generate(input: ApproachContext): Promise<GeneratedApproach>;
}

export class DefaultApproachGenerator implements ApproachGenerator {
  providerName = "default";

  async generate(input: ApproachContext): Promise<GeneratedApproach> {
    // Check if an AI provider is actually configured.
    // Assuming we would check process.env.OPENAI_API_KEY or similar here.
    const isAiConfigured = false; 
    
    if (!isAiConfigured) {
      return { success: false, error: "AI_PROVIDER_NOT_CONFIGURED" };
    }

    // Logic for AI would go here. We won't invent facts.
    // If it were active, we would do an LLM call strictly using the ApproachContext.
    
    return { 
      success: true, 
      approach: "Olá! Vimos o seu trabalho e..." 
    };
  }
}
