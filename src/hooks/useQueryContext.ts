import { QueryContext } from '@/contexts/QueryContext'
import { useContext } from 'react'

export const useQueryContext = () => useContext(QueryContext)
