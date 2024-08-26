import { CartContext } from '@/contexts/CartContext'
import { useContext } from 'react'

export const useCartContext = () => useContext(CartContext)
