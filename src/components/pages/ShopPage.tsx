import { Product, getProducts } from '@/services/products'
import { useEffect, useState } from 'react'

type QueryState = {
  isLoading: boolean
  error: string
  data: null | Product[]
}

const defaultQueryState: QueryState = {
  isLoading: false,
  error: '',
  data: null,
}

const ShopPage = () => {
  const [query, setQuery] = useState<QueryState>(defaultQueryState)

  useEffect(() => {
    const fetch = async () => {
      try {
        setQuery((pV) => ({ ...pV, isLoading: true }))
        const products = await getProducts({ query: { availability: true } })
        setQuery({
          isLoading: false,
          error: '',
          data: products,
        })
      } catch (error) {
        const { message } = error as Error
        setQuery({
          isLoading: false,
          error: message,
          data: null,
        })
      }
    }

    fetch()
  }, [])

  console.log(query)

  return <></>
}

export default ShopPage
