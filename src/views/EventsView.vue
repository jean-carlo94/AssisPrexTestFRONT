<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useEventsStore } from '@/stores/events'

const store = useEventsStore()
const route = useRoute()

const actionLabel = (action: string): string => {
  const labels: Record<string, string> = {
    CREATE: 'Creado',
    UPDATE: 'Actualizado',
    DELETE: 'Eliminado',
    STATUS_CHANGED: 'Estado cambiado',
  }
  return labels[action] || action
}

const actionClass = (action: string): string => {
  return `badge-action-${action.toLowerCase()}`
}

const formatDate = (date: string): string => {
  return new Date(date).toLocaleString('es-PE')
}

const prettyJson = (raw: string): string => {
  try {
    return JSON.stringify(JSON.parse(raw), null, 2)
  } catch {
    return raw
  }
}

onMounted(() => {
  const productId = route.query.product_id
  if (productId) {
    store.fetchByProduct(Number(productId))
  } else {
    store.fetchAll()
  }
})
</script>

<template>
  <div class="events-page">
    <header class="page-header">
      <h1>Log de eventos</h1>
    </header>

    <div v-if="store.loading" class="empty-state">
      <p>Cargando eventos...</p>
    </div>

    <div v-else-if="store.error" class="error-banner">
      <p>{{ store.error }}</p>
      <button class="btn btn-sm" @click="store.fetchAll()">Reintentar</button>
    </div>

    <div v-else-if="store.events.length === 0" class="empty-state">
      <p>No hay eventos registrados.</p>
    </div>

    <table v-else class="events-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Producto</th>
          <th>Acción</th>
          <th>Datos</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in store.events" :key="event.id">
          <td>{{ event.id }}</td>
          <td>#{{ event.product_id }}</td>
          <td>
            <span :class="['badge', actionClass(event.action)]">{{ actionLabel(event.action) }}</span>
          </td>
          <td class="details-cell">
            <pre>{{ prettyJson(event.description) }}</pre>
          </td>
          <td>{{ formatDate(event.create_at) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.events-page {
  width: 100%;
  padding: 32px;
  text-align: left;
  box-sizing: border-box;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
}

.page-header h1 {
  margin: 0;
  font-size: 32px;
}

.empty-state {
  text-align: center;
  padding: 64px 0;
  color: var(--text);
}

.error-banner {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.error-banner p {
  color: #ef4444;
  margin: 0;
}

.events-table {
  width: 100%;
  border-collapse: collapse;
}

.events-table th,
.events-table td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  vertical-align: top;
}

.events-table th {
  text-align: left;
  font-weight: 500;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text);
  white-space: nowrap;
}

.events-table td {
  font-size: 14px;
}

.details-cell pre {
  margin: 0;
  padding: 8px 12px;
  background: var(--code-bg);
  border-radius: 6px;
  font-family: ui-monospace, Consolas, monospace;
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-h);
  white-space: pre-wrap;
  word-break: break-word;
  max-height: 200px;
  overflow-y: auto;
}

.badge {
  display: inline-flex;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
}

.badge-action-create {
  background: rgba(34, 197, 94, 0.15);
  color: #22c55e;
}

.badge-action-update {
  background: rgba(59, 130, 246, 0.15);
  color: #3b82f6;
}

.badge-action-delete {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.badge-action-status_changed {
  background: rgba(168, 85, 247, 0.15);
  color: #a855f7;
}

.btn {
  font-family: inherit;
  font-size: 15px;
  padding: 10px 20px;
  border-radius: 8px;
  border: 1px solid var(--border);
  cursor: pointer;
  background: var(--bg);
  color: var(--text-h);
  transition: background 0.2s, border-color 0.2s;
}

.btn:hover {
  border-color: var(--accent-border);
}

.btn-sm {
  padding: 6px 14px;
  font-size: 13px;
}

@media (max-width: 768px) {
  .events-page {
    padding: 20px;
  }
}
</style>
