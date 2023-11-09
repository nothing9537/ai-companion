import { AxiosError } from 'axios';
import { Companion } from '@prisma/client';

import { CompanionFormSchemaValues } from './companion.api.dtos';

export interface CompanionAPIMethods {
  updateCompanion(id: string, data: CompanionFormSchemaValues): Promise<Companion | AxiosError>; // Patch
  createCompanion(data: CompanionFormSchemaValues): Promise<Companion | AxiosError>; // Post
}
