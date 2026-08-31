import { PLAN_CONFIG, PlanType } from "./plans";

export function getPlanConfig(plan: PlanType) {
  return PLAN_CONFIG[plan] || PLAN_CONFIG.FREE;
}

export function getUserEntitlements(plan: PlanType) {
  return getPlanConfig(plan);
}

export function canViewContactField(plan: PlanType, field: "instagram" | "whatsapp" | "phone" | "website") {
  const config = getPlanConfig(plan);
  return config.contactFields[field];
}

export function canUseFeature(plan: PlanType, feature: "smartServiceFilter" | "excelExport" | "priorityFeatures") {
  const config = getPlanConfig(plan);
  return config.features[feature];
}

export function getSearchLimit(plan: PlanType) {
  return getPlanConfig(plan).searchesPerDay;
}

export function getMaxResultsPerSearch(plan: PlanType) {
  return getPlanConfig(plan).maxResultsPerSearch;
}

export function hasUnlimitedSearches(plan: PlanType) {
  return getPlanConfig(plan).unlimitedSearches;
}
