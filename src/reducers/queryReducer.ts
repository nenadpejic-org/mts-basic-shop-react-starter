import { Product } from '@/services/products'

type QueryReducerState = {
  isLoading: boolean
  error: string
  data: null | Product[]
}

const defaultQueryReducerState: QueryReducerState = {
  isLoading: false,
  error: '',
  data: null,
}

type Action =
  | { type: 'init' }
  | { type: 'error'; payload: string }
  | { type: 'success'; payload: Product[] }

const queryReducer = (
  state: QueryReducerState,
  action: Action,
): QueryReducerState => {
  switch (action.type) {
    case 'init':
      return {
        ...state,
        isLoading: true,
        error: '',
        data: null,
      }
    case 'error':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    case 'success':
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      }
  }
}

export { defaultQueryReducerState, queryReducer, type QueryReducerState }
