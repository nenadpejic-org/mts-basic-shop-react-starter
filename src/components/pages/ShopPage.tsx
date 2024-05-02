import { Product, getProducts } from '@/services/products'
import { useEffect, useState } from 'react'

type GetProductsQuery = {
  isLoading: boolean
  error: string
  data: null | Product[]
}

const defaultGetProductsQuery: GetProductsQuery = {
  isLoading: false,
  error: '',
  data: null,
}

const ShopPage = () => {
  const [getProductsQuery, setGetProductsQuery] = useState<GetProductsQuery>(
    defaultGetProductsQuery,
  )

  useEffect(() => {
    const fetch = async () => {
      try {
        setGetProductsQuery({ isLoading: true, error: '', data: null })
        const products = await getProducts({ query: { availability: true } })
        setGetProductsQuery((pV) => ({
          ...pV,
          isLoading: false,
          data: products,
        }))
      } catch (error) {
        const { message } = error as Error
        setGetProductsQuery((pV) => ({
          ...pV,
          isLoading: false,
          error: message,
        }))
      }
    }

    fetch()
  }, [])

  console.log(getProductsQuery)

  return <></>
}

export default ShopPage
