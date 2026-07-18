<script setup lang="ts">
defineProps<{
  state: string
}>()

const labels: Record<string, string> = {
  active: 'Activo',
  discontinued: 'Descontinuado',
}
</script>

<template>
  <span :class="['badge', `badge-${state}`]">{{ labels[state] || state }}</span>
</template>

<style scoped>
.badge {
  display: inline-flex;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
}

.badge-active {
  background: rgba(34, 197, 94, 0.15);
  color: #22c55e;
}

.badge-discontinued {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}
</style>
