import { useQuery } from '@/hooks/useQuery'
import { Product } from '@/services/products'
import { useEffect, useState } from 'react'
import { ProductsList } from '../ProductsList'
import Heading from '../ui/Heading'
import Icon from '../ui/Icon'

const ShopPage = () => {
  const query = useQuery()
  const [products, setProducts] = useState<null | Product[]>(null)

  useEffect(() => {
    query.fetch({
      onSuccess: (products) => {
        const availableProducts = products.filter((p) => p.availability)
        setProducts(availableProducts)
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="py-8">
      <div className="container">
        <Heading>Explore our Shop: Elevate Your Ride</Heading>

        <div className="relative mt-8">
          <Icon
            icon="search"
            className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2"
          />
          <input
            className="w-full border border-gray-400 bg-gray-50 px-4 py-2 pl-10 text-gray-900 placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
            type="text"
            placeholder="Search products"
          />
        </div>

        <ProductsList
          className="mt-8"
          products={products}
          error={query.error}
          isLoading={query.isLoading}
        />
      </div>
    </section>
  )
}

export default ShopPage
