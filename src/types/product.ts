export interface Product {
  id: number
  name: string
  description: string | null
  price: number
  stock: number
  state: string
  create_at: string
}

export interface ProductForm {
  name: string
  description: string
  price: number
  stock: number
  state: string
}

export function createEmptyProduct(): ProductForm {
  return {
    name: '',
    description: '',
    price: 0,
    stock: 0,
    state: 'active',
  }
}
