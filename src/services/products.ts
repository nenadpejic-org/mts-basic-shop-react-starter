import { jsonApi } from './jsonApi'

const PATH = '/products'

type ProductCategory = 'Bindings' | 'Boots' | 'Jackets' | 'Pants' | 'Snowboard'

type ProductColor =
  | 'Black'
  | 'Blue'
  | 'Burgundy'
  | 'Green'
  | 'Sand'
  | 'Violet'
  | 'White'
  | 'Yellow'

type ProductFeature =
  | 'Advanced Camber Profile'
  | 'Customizable Binding Adjustments'
  | 'Integrated Impact Protection'
  | 'Quick-Lace System for Boots'
  | 'Smartphone Connectivity for Wearables'

export type Product = {
  availability: boolean
  category: ProductCategory
  color: ProductColor
  description: string
  features: ProductFeature[]
  id: string
  image: string
  name: string
  price: number
  stockQuantity: number
}

type ProductsQuery = Partial<Product>

type GetAllProductsOptions = {
  query?: ProductsQuery
}

export const getProducts = (options?: GetAllProductsOptions) => {
  const { query } = options || {}
  return jsonApi<Product[]>({ endpoint: PATH, query })
}
