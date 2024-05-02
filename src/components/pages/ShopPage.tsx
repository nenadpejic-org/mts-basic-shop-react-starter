import { useQuery } from '@/hooks/useQuery'
import { useEffect } from 'react'

const ShopPage = () => {
  const { getProductsQuery } = useQuery()

  useEffect(() => {
    getProductsQuery.fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(getProductsQuery)

  return <></>
}

export default ShopPage
