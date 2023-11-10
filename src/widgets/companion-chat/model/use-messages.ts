import { StoreApi, create } from 'zustand';

import { AppMessage } from '@/entities/message';

interface UseMessageStore {
  messages: AppMessage[];
  setMessages: (messages: AppMessage[]) => void;
  addNewMessages: (messages: AppMessage[]) => void;
}

export const useCompanionMessages = create<UseMessageStore>((set: StoreApi<UseMessageStore>['setState'], get: StoreApi<UseMessageStore>['getState']) => ({
  messages: [],
  setMessages: (messages: AppMessage[]) => set({ messages }),
  addNewMessages: (messages: AppMessage[]) => set({ messages: [...get().messages, ...messages] }),
}));
