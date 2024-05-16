import { CartContext } from '@/contexts/CartContext'
import { useContext } from 'react'

const useCart = () => {
  const cart = useContext(CartContext)

  return cart
}

export { useCart }
