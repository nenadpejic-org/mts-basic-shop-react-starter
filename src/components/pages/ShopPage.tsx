import { QueryContext } from '@/contexts/QueryContext'
import { useContext, useEffect } from 'react'

const ShopPage = () => {
  const query = useContext(QueryContext)

  useEffect(() => {
    query.fetch({ options: { query: { availability: true } } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(query)

  return <></>
}

export default ShopPage
