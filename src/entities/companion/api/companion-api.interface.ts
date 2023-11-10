import { AxiosError } from 'axios';
import { Companion } from '@prisma/client';

import { CompanionFormSchemaValues } from './companion.api.dtos';

export type APIRouteReturn = Companion | AxiosError;

export interface CompanionAPIMethods {
  updateCompanion(id: string, data: CompanionFormSchemaValues): Promise<APIRouteReturn>; // Patch
  createCompanion(data: CompanionFormSchemaValues): Promise<APIRouteReturn>; // Post
  deleteCompanion(id: string): Promise<APIRouteReturn> // Delete
}
