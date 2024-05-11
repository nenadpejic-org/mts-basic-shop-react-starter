import { useQuery } from '@/hooks/useQuery'
import { useEffect } from 'react'

const ShopPage = () => {
  const query = useQuery()

  useEffect(() => {
    query.fetch({ options: { query: { availability: true } } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(query)

  return <></>
}

export default ShopPage
