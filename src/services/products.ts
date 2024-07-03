import { Query, jsonApi } from './jsonApi'

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

export type GetAllProductsOptions = {
  query?: Query & Partial<Product>
}

export const getProducts = (options?: GetAllProductsOptions) => {
  const { query } = options || {}
  return jsonApi<Product[]>({ endpoint: PATH, query })
}
