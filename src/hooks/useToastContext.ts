import { ToastContext } from '@/contexts/ToastContext'
import { useContext } from 'react'

export const useToastContext = () => useContext(ToastContext)
