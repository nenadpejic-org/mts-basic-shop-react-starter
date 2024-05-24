import { useQuery } from '@/hooks/useQuery'
import { ChangeEvent, useEffect, useState } from 'react'
import { ProductsList } from '../ProductsList'
import Heading from '../ui/Heading'
import Icon from '../ui/Icon'

const ShopPage = () => {
  const { getShopProducts } = useQuery()
  const [searchedProduct, setSearchedProduct] = useState('')

  useEffect(() => {
    getShopProducts.fetch({
      options: {
        query: { availability: true, name_like: searchedProduct },
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedProduct])

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchedProduct(e.target.value)
  }

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
            className="w-full border border-gray-400 bg-gray-50 px-4 py-2 pl-10 text-gray-900 placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50 lg:w-auto"
            type="text"
            placeholder="Search products"
            onChange={handleSearch}
          />
        </div>

        <ProductsList
          className="mt-8"
          products={getShopProducts.data}
          error={getShopProducts.error}
          isLoading={getShopProducts.isLoading}
        />
      </div>
    </section>
  )
}

export default ShopPage
