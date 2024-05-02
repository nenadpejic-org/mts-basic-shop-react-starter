import { Product } from '@/services/products'

type QueryReducerState = {
  getProductsQuery: {
    isLoading: boolean
    error: string
    data: null | Product[]
  }
}

const defaultQueryReducerState: QueryReducerState = {
  getProductsQuery: {
    isLoading: false,
    error: '',
    data: null,
  },
}

type Action =
  | { type: 'getProductsQuery.init' }
  | { type: 'getProductsQuery.error'; payload: string }
  | { type: 'getProductsQuery.success'; payload: Product[] }

const queryReducer = (
  state: QueryReducerState,
  action: Action,
): QueryReducerState => {
  switch (action.type) {
    case 'getProductsQuery.init':
      return {
        ...state,
        getProductsQuery: {
          ...state.getProductsQuery,
          isLoading: true,
          error: '',
          data: null,
        },
      }
    case 'getProductsQuery.error':
      return {
        ...state,
        getProductsQuery: {
          ...state.getProductsQuery,
          isLoading: false,
          error: action.payload,
        },
      }
    case 'getProductsQuery.success':
      return {
        ...state,
        getProductsQuery: {
          ...state.getProductsQuery,
          isLoading: false,
          data: action.payload,
        },
      }
  }
}

export { defaultQueryReducerState, queryReducer, type QueryReducerState }
