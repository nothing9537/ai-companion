import { CompanionAPI } from './companion-api';

export type { CompanionFormSchemaValues } from './companion.api.dtos';
export { CompanionFormSchema } from './companion.api.dtos';

export const companionAPI = new CompanionAPI();
