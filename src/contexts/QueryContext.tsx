import {
  QueryReducerState,
  defaultQueryReducerState,
  queryReducer,
} from '@/reducers/queryReducer'
import { Product, getProducts } from '@/services/products'
import { ReactNode, createContext, useReducer } from 'react'

type QueryState = QueryReducerState & {
  getProductsQuery: {
    fetch: (props?: {
      options?: Parameters<typeof getProducts>[0]
      onSuccess?: (data: Product[]) => void
      onError?: (error: string) => void
    }) => Promise<void>
  }
}

const QueryContext = createContext<QueryState>({} as QueryState)

type Props = {
  children?: ReactNode
}

const QueryContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(queryReducer, defaultQueryReducerState)

  const queryState: QueryState = {
    getProductsQuery: {
      ...state.getProductsQuery,
      fetch: async (props) => {
        const { options, onSuccess, onError } = props || {}
        try {
          dispatch({ type: 'getProductsQuery.init' })
          const data = await getProducts(options)
          dispatch({ type: 'getProductsQuery.success', payload: data })
          onSuccess?.(data)
        } catch (error) {
          const { message } = error as Error
          dispatch({
            type: 'getProductsQuery.error',
            payload: message,
          })
          onError?.(message)
        }
      },
    },
  }

  return (
    <QueryContext.Provider value={queryState}>{children}</QueryContext.Provider>
  )
}

export { QueryContext, QueryContextProvider }
