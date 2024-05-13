import { Product } from '@/services/products'
import ProductCard from './ProductCard'
import { twMerge } from 'tailwind-merge'

type Props = {
  products: null | Product[]
  isLoading: boolean
  error: string
  className?: string
}

const ProductsList = ({ products, isLoading, error, className }: Props) => {
  return (
    <ul
      className={twMerge(
        'grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4',
        className,
      )}
    >
      {!products?.length && (
        <li className="col-span-2 text-center md:col-span-4">
          {isLoading && <p className="text-gray-500">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {products?.length === 0 && <p>No products found</p>}
        </li>
      )}
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  )
}

export { ProductsList }
