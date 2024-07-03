import { useQuery } from '@/hooks/useQuery'
import { ChangeEvent, useEffect, useState } from 'react'
import { ProductsList } from '../ProductsList'
import Heading from '../ui/Heading'
import TextInput from '../ui/TextInput'

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

        <TextInput
          className="mt-8 w-full lg:w-auto"
          placeholder="Search products"
          iconBefore="search"
          onChange={handleSearch}
        />

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
