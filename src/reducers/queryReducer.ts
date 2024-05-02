import { Product } from '@/services/products'

type QueryReducerState = {
  isLoading: boolean
  error: string
  data: null | Product[]
}

export const defaultQueryReducerState: QueryReducerState = {
  isLoading: false,
  error: '',
  data: null,
}

type Action =
  | { type: 'init' }
  | { type: 'error'; payload: string }
  | { type: 'success'; payload: Product[] }

export const queryReducer = (
  state: QueryReducerState,
  action: Action,
): QueryReducerState => {
  switch (action.type) {
    case 'init':
      return {
        ...state,
        isLoading: true,
      }
    case 'error':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        data: null,
      }
    case 'success':
      return {
        ...state,
        isLoading: false,
        error: '',
        data: action.payload,
      }
  }
}
