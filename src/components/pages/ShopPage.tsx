import { Product, getProducts } from '@/services/products'
import { useEffect, useReducer } from 'react'

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

type Action =
  | { type: 'getProductsQuery.init' }
  | { type: 'getProductsQuery.error'; payload: string }
  | { type: 'getProductsQuery.success'; payload: Product[] }

const queryReducer = (
  state: GetProductsQuery,
  action: Action,
): GetProductsQuery => {
  switch (action.type) {
    case 'getProductsQuery.init':
      return {
        isLoading: true,
        error: '',
        data: null,
      }
    case 'getProductsQuery.error':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    case 'getProductsQuery.success':
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      }
  }
}

const ShopPage = () => {
  const [state, dispatch] = useReducer(queryReducer, defaultGetProductsQuery)

  useEffect(() => {
    const fetch = async () => {
      try {
        dispatch({ type: 'getProductsQuery.init' })
        const data = await getProducts({ query: { availability: true } })
        dispatch({ type: 'getProductsQuery.success', payload: data })
      } catch (error) {
        const { message } = error as Error
        dispatch({
          type: 'getProductsQuery.error',
          payload: message,
        })
      }
    }

    fetch()
  }, [])

  console.log(state)

  return <></>
}

export default ShopPage
