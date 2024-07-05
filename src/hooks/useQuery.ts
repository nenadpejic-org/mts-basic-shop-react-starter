import { useState } from 'react'

type QueryState<TData> = {
  isLoading: boolean
  error: string
  data: TData | null
}

const defaultQueryState = {
  isLoading: false,
  error: '',
  data: null,
}

type QueryFetch<TVariables, TData> = (
  variables: TVariables,
  options?: {
    onSuccess?: ((data: TData) => void) | undefined
    onError?: ((error: Error) => void) | undefined
  },
) => Promise<void>

type QueryUpdate<TData> = (
  callback: (data: TData | null) => TData | null,
) => void

export type QueryResult<TVariables, TData> = QueryState<TData> & {
  fetch: QueryFetch<TVariables, TData>
  update: QueryUpdate<TData>
}

type QueryOptions<TVariables, TData> = {
  fn: (variables: TVariables) => Promise<TData>
}

const useQuery = <TVariables, TData>({
  fn,
}: QueryOptions<TVariables, TData>): QueryResult<TVariables, TData> => {
  const [queryState, setQueryState] =
    useState<QueryState<TData>>(defaultQueryState)

  const fetch: QueryFetch<TVariables, TData> = async (variables, options) => {
    const { onSuccess, onError } = options || {}
    try {
      setQueryState((pV) => ({ ...pV, isLoading: true }))
      const data = await fn(variables)
      setQueryState({ isLoading: false, error: '', data })
      onSuccess?.(data)
    } catch (err) {
      const error = err as Error
      setQueryState({
        isLoading: false,
        error: error.message,
        data: null,
      })
      onError?.(error)
    }
  }

  const update: QueryUpdate<TData> = (callback) =>
    setQueryState((pV) => ({ ...pV, data: callback(pV.data) }))

  return {
    ...queryState,
    fetch,
    update,
  }
}

export default useQuery
