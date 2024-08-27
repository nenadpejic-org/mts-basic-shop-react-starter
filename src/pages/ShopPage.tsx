import { useQueryContext } from '@/hooks/useQueryContext'
import { ChangeEvent, useEffect, useState } from 'react'
import { ProductsList } from '../components/ProductsList'
import Heading from '../components/ui/Heading'
import TextInput from '../components/ui/TextInput'

const ShopPage = () => {
  const { getShopProductsQuery } = useQueryContext()
  const [searchedProduct, setSearchedProduct] = useState('')

  useEffect(() => {
    getShopProductsQuery.fetch({
      query: { availability: true, name_like: searchedProduct },
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
          products={getShopProductsQuery.data}
          error={getShopProductsQuery.error}
          isLoading={getShopProductsQuery.isLoading}
        />
      </div>
    </section>
  )
}

export default ShopPage
