import {
  QueryReducerState,
  defaultQueryReducerState,
  queryReducer,
} from '@/reducers/queryReducer'
import {
  GetAllProductsOptions,
  Product,
  getProducts,
} from '@/services/products'
import { ReactNode, createContext, useReducer } from 'react'

type QueryState = QueryReducerState & {
  getShopProducts: {
    fetch: (props?: {
      options?: {
        query: Pick<
          Required<GetAllProductsOptions>['query'],
          'availability' | 'name_like'
        >
      }
      onSuccess?: (data: Product[]) => void
      onError?: (error: string) => void
    }) => Promise<void>
  }
  getConsoleProducts: {
    fetch: (props?: {
      options?: {
        query: Pick<Required<GetAllProductsOptions>['query'], 'name_like'>
      }
      onSuccess?: (data: Product[]) => void
      onError?: (error: string) => void
    }) => Promise<void>
  }
}

export const QueryContext = createContext<QueryState>({} as QueryState)

type Props = {
  children?: ReactNode
}

export const QueryContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(queryReducer, defaultQueryReducerState)

  const queryState: QueryState = {
    ...state,
    getShopProducts: {
      ...state.getShopProducts,
      fetch: async (props) => {
        const { options, onSuccess, onError } = props || {}
        try {
          dispatch({ type: 'getShopProducts.init' })
          const data = await getProducts(options)
          dispatch({
            type: 'getShopProducts.success',
            payload: data,
          })
          onSuccess?.(data)
        } catch (error) {
          const { message } = error as Error
          dispatch({
            type: 'getShopProducts.error',
            payload: message,
          })
          onError?.(message)
        }
      },
    },
    getConsoleProducts: {
      ...state.getConsoleProducts,
      fetch: async (props) => {
        const { options, onSuccess, onError } = props || {}
        try {
          dispatch({ type: 'getConsoleProducts.init' })
          const data = await getProducts(options)
          dispatch({
            type: 'getConsoleProducts.success',
            payload: data,
          })
          onSuccess?.(data)
        } catch (error) {
          const { message } = error as Error
          dispatch({
            type: 'getConsoleProducts.error',
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
