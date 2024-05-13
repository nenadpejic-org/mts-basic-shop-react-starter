import { useQuery } from '@/hooks/useQuery'
import { useEffect } from 'react'
import { ProductsList } from '../ProductsList'
import Heading from '../ui/Heading'

const ShopPage = () => {
  const query = useQuery()

  useEffect(() => {
    query.fetch({ options: { query: { availability: true } } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="py-8">
      <div className="container">
        <Heading>Explore our Shop: Elevate Your Ride</Heading>

        <ProductsList
          className="mt-8"
          products={query.data}
          error={query.error}
          isLoading={query.isLoading}
        />
      </div>
    </section>
  )
}

export default ShopPage
