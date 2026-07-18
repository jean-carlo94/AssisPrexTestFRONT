import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product, ProductForm } from '@/types/product'
import { createEmptyProduct } from '@/types/product'
import { productsService } from '@/services/products'

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const form = ref<ProductForm>(createEmptyProduct())
  const editingId = ref<number | null>(null)
  const isFormOpen = ref(false)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const saving = ref(false)

  const isEditing = computed(() => editingId.value !== null)
  const productCount = computed(() => products.value.length)

  async function fetchProducts() {
    loading.value = true
    error.value = null

    try {
      products.value = await productsService.getAll()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error al cargar productos'
    } finally {
      loading.value = false
    }
  }

  function openCreateForm() {
    form.value = createEmptyProduct()
    editingId.value = null
    isFormOpen.value = true
  }

  function openEditForm(product: Product) {
    form.value = {
      name: product.name,
      description: product.description ?? '',
      price: product.price,
      stock: product.stock,
      state: product.state,
    }
    editingId.value = product.id
    isFormOpen.value = true
  }

  function closeForm() {
    isFormOpen.value = false
  }

  async function saveProduct() {
    if (!form.value.name.trim()) return

    saving.value = true
    error.value = null

    try {
      if (editingId.value !== null) {
        const updated = await productsService.update(editingId.value, form.value)
        const index = products.value.findIndex((p) => p.id === editingId.value)
        if (index !== -1) {
          products.value[index] = updated
        }
      } else {
        const created = await productsService.create(form.value)
        products.value.push(created)
      }

      closeForm()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error al guardar producto'
    } finally {
      saving.value = false
    }
  }

  async function deleteProduct(id: number) {
    loading.value = true
    error.value = null

    try {
      await productsService.remove(id)
      products.value = products.value.filter((p) => p.id !== id)
      if (editingId.value === id) closeForm()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error al eliminar producto'
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    form,
    editingId,
    isFormOpen,
    loading,
    error,
    saving,
    isEditing,
    productCount,
    fetchProducts,
    openCreateForm,
    openEditForm,
    closeForm,
    saveProduct,
    deleteProduct,
  }
})
