import { defaultQueryReducerState, queryReducer } from '@/reducers/queryReducer'
import { getProducts } from '@/services/products'
import { useEffect, useReducer } from 'react'

const ShopPage = () => {
  const [state, dispatch] = useReducer(queryReducer, defaultQueryReducerState)

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
