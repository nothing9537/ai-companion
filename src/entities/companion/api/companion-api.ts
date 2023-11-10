import axios, { AxiosError } from 'axios';
import { Companion } from '@prisma/client';

import { CompanionFormSchemaValues } from './companion.api.dtos';
import { APIRouteReturn, CompanionAPIMethods } from './companion-api.interface';

export class CompanionAPI implements CompanionAPIMethods {
  public async updateCompanion(id: string, data: CompanionFormSchemaValues): Promise<APIRouteReturn> {
    try {
      const response = await axios.patch<Companion>(`/api/companion/${id}`, data);

      return response.data;
    } catch (error: unknown) {
      console.error('[COMPANION_API_PATCH]', error);

      return error as AxiosError;
    }
  }

  public async createCompanion(data: CompanionFormSchemaValues): Promise<APIRouteReturn> {
    try {
      const response = await axios.post<Companion>('/api/companion', data);

      return response.data;
    } catch (error: unknown) {
      console.error('[COMPANION_API_POST]', error);

      return error as AxiosError;
    }
  }

  public async deleteCompanion(id: string): Promise<APIRouteReturn> {
    try {
      const response = await axios.delete<Companion>(`/api/companion/${id}`);

      return response.data;
    } catch (error: unknown) {
      console.error('[COMPANION_API_DELETE]', error);

      return error as AxiosError;
    }
  }
}
