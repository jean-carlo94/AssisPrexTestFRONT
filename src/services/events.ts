import api from './api'
import type { Event } from '@/types/event'

export const eventsService = {
  async getAll(): Promise<Event[]> {
    return api.get('events/') as Promise<Event[]>
  },

  async getById(id: number): Promise<Event> {
    return api.get(`events/${id}`) as Promise<Event>
  },

  async getByProduct(productId: number): Promise<Event[]> {
    return api.get(`products/${productId}/events/`) as Promise<Event[]>
  },
}
