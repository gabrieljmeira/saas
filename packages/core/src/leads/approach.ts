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
    const isAiConfigured = false; 
    
    if (!isAiConfigured) {
      return { success: false, error: "AI_PROVIDER_NOT_CONFIGURED" };
    }
    
    return { 
      success: true, 
      approach: "Olá! Vimos o seu trabalho e..." 
    };
  }
}
