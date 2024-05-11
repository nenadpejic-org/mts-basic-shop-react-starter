import { QueryContext } from '@/contexts/QueryContext'
import { useContext } from 'react'

const useQuery = () => {
  const query = useContext(QueryContext)

  return query
}

export { useQuery }
