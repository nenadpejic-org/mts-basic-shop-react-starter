import { QueryContext } from '@/contexts/QueryContext'
import { useContext } from 'react'

export const useQueryContext = () => {
  const cart = useContext(QueryContext)

  return cart
}
