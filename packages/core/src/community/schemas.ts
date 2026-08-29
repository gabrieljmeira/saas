import { z } from "zod";

export const CommunityPostTypeEnum = z.enum([
  "result",
  "achievement",
  "strategy",
  "question",
  "template",
  "weekly_result"
]);
export type CommunityPostType = z.infer<typeof CommunityPostTypeEnum>;

export const SourceTypeEnum = z.enum([
  "manual",
  "crm_opportunity",
  "gamification_achievement",
  "weekly_metrics"
]);
export type SourceType = z.infer<typeof SourceTypeEnum>;

export const ResultMetadataSchema = z.object({
  amountCents: z.number().int().nonnegative(),
  niche: z.string().min(1).max(50),
  city: z.string().max(100).optional(),
  leadScore: z.number().int().min(0).max(100).optional(),
  closeDays: z.number().int().nonnegative().optional(),
  channel: z.enum(["whatsapp", "instagram", "email", "other"]).optional(),
});
export type ResultMetadata = z.infer<typeof ResultMetadataSchema>;

export const AchievementMetadataSchema = z.object({
  achievementKey: z.string(),
  title: z.string().max(100),
  description: z.string().max(300).optional(),
});
export type AchievementMetadata = z.infer<typeof AchievementMetadataSchema>;

export const WeeklyResultMetadataSchema = z.object({
  leads: z.number().int().nonnegative(),
  contacts: z.number().int().nonnegative(),
  replies: z.number().int().nonnegative(),
  proposals: z.number().int().nonnegative(),
  sales: z.number().int().nonnegative(),
  revenueCents: z.number().int().nonnegative().optional(),
});
export type WeeklyResultMetadata = z.infer<typeof WeeklyResultMetadataSchema>;

export const TemplateMetadataSchema = z.object({
  title: z.string().max(120),
  niche: z.string().max(50).optional(),
  channel: z.enum(["whatsapp", "email", "instagram", "other"]).optional(),
});
export type TemplateMetadata = z.infer<typeof TemplateMetadataSchema>;

// Payloads for manual creation
export const CreateManualPostSchema = z.object({
  type: z.enum(["strategy", "question", "template"]),
  content: z.string().min(1, "O conteúdo é obrigatório").max(3000, "O conteúdo é muito longo"),
  templateMetadata: TemplateMetadataSchema.optional(), // Required if type === "template"
}).refine(data => {
  if (data.type === "template" && !data.templateMetadata) {
    return false;
  }
  return true;
}, {
  message: "Metadados do template são obrigatórios",
  path: ["templateMetadata"],
});

export const CreateVerifiedResultSchema = z.object({
  opportunityId: z.string().uuid(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "O consentimento é obrigatório para compartilhar vendas." })
  }),
});
