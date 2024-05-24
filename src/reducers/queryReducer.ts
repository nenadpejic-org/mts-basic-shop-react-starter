import { Product } from '@/services/products'

export type QueryReducerState = {
  getShopProducts: {
    isLoading: boolean
    error: string
    data: null | Product[]
  }
  getConsoleProducts: {
    isLoading: boolean
    error: string
    data: null | Product[]
  }
}

export const defaultQueryReducerState: QueryReducerState = {
  getShopProducts: {
    isLoading: false,
    error: '',
    data: null,
  },
  getConsoleProducts: {
    isLoading: false,
    error: '',
    data: null,
  },
}

type Action =
  | { type: 'getShopProducts.init' }
  | { type: 'getShopProducts.error'; payload: string }
  | { type: 'getShopProducts.success'; payload: Product[] }
  | { type: 'getConsoleProducts.init' }
  | { type: 'getConsoleProducts.error'; payload: string }
  | { type: 'getConsoleProducts.success'; payload: Product[] }

export const queryReducer = (
  state: QueryReducerState,
  action: Action,
): QueryReducerState => {
  switch (action.type) {
    case 'getShopProducts.init':
      return {
        ...state,
        getShopProducts: {
          ...state.getShopProducts,
          isLoading: true,
        },
      }
    case 'getShopProducts.error':
      return {
        ...state,
        getShopProducts: {
          isLoading: false,
          error: action.payload,
          data: null,
        },
      }
    case 'getShopProducts.success':
      return {
        ...state,
        getShopProducts: {
          isLoading: false,
          error: '',
          data: action.payload,
        },
      }
    case 'getConsoleProducts.init':
      return {
        ...state,
        getConsoleProducts: {
          ...state.getConsoleProducts,
          isLoading: true,
        },
      }
    case 'getConsoleProducts.error':
      return {
        ...state,
        getConsoleProducts: {
          isLoading: false,
          error: action.payload,
          data: null,
        },
      }
    case 'getConsoleProducts.success':
      return {
        ...state,
        getConsoleProducts: {
          isLoading: false,
          error: '',
          data: action.payload,
        },
      }
  }
}
