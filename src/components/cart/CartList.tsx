import { useCartContext } from '@/hooks/useCartContext'
import CartItem from './CartItem'

const CartList = () => {
  const { cartItems } = useCartContext()

  return (
    !!cartItems.length && (
      <ul className="mx-4 space-y-4 overflow-y-auto">
        {cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
    )
  )
}

export { CartList }
