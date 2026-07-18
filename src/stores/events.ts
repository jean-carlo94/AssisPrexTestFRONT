import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Event } from '@/types/event'
import { eventsService } from '@/services/events'

export const useEventsStore = defineStore('events', () => {
  const events = ref<Event[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchAll() {
    loading.value = true
    error.value = null

    try {
      events.value = await eventsService.getAll()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error al cargar eventos'
    } finally {
      loading.value = false
    }
  }

  async function fetchByProduct(productId: number) {
    loading.value = true
    error.value = null

    try {
      events.value = await eventsService.getByProduct(productId)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error al cargar eventos'
    } finally {
      loading.value = false
    }
  }

  return {
    events,
    loading,
    error,
    fetchAll,
    fetchByProduct,
  }
})
