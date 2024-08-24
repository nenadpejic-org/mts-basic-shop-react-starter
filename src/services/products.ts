import { jsonApi } from './jsonApi'

const PATH = '/products'

type ProductCategory = 'Bindings' | 'Boots' | 'Jackets' | 'Pants' | 'Snowboard'

export const productCategories: ProductCategory[] = [
  'Bindings',
  'Boots',
  'Jackets',
  'Pants',
  'Snowboard',
]

type ProductColor =
  | 'Black'
  | 'Blue'
  | 'Burgundy'
  | 'Green'
  | 'Sand'
  | 'Violet'
  | 'White'
  | 'Yellow'

export const productColors: ProductColor[] = [
  'Black',
  'Blue',
  'Burgundy',
  'Green',
  'Sand',
  'Violet',
  'White',
  'Yellow',
]

export type Product = {
  availability: boolean
  category: ProductCategory
  color: ProductColor
  description: string
  id: string
  image: string
  name: string
  price: number
  stockQuantity: number
}

export type GetProductsOptions = {
  query?: { name_like?: string } & Partial<Product>
}

export const getProducts = (options?: GetProductsOptions) => {
  const { query } = options || {}

  return jsonApi<Product[]>({ endpoint: PATH, query })
}

export type AddProductOptions = {
  payload: {
    availability: boolean
    category: string
    color: string
    description?: string
    image: string
    name: string
    price: number
    stockQuantity: number
  }
}

export const addProduct = (options: AddProductOptions) => {
  const { payload } = options

  return jsonApi<Product>({
    endpoint: PATH,
    init: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(payload),
    },
  })
}
