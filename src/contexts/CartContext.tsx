import { Product } from '@/services/products'
import { ReactNode, createContext, useEffect, useState } from 'react'

export type CartItem = Product & {
  quantity: number
}

type CartState = {
  cartCount: number
  cartItems: CartItem[]
  cartTotal: number
  handleAddItemToCart: (productToAdd: Product) => void
  handleDeleteItemFromCart: (productIdToDelete: string) => void
  handleRemoveItemFromCart: (productIdToRemove: string) => void
}

export const CartContext = createContext<CartState>({
  cartCount: 0,
  cartItems: [],
  cartTotal: 0,
  handleAddItemToCart: () => {},
  handleDeleteItemFromCart: () => {},
  handleRemoveItemFromCart: () => {},
})

type Props = {
  children?: ReactNode
}

export const CartContextProvider = ({ children }: Props) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartCount, setCartCount] = useState(0)
  const [cartTotal, setCartTotal] = useState(0)

  useEffect(() => {
    setCartCount(
      cartItems.reduce((count, cartItem) => count + cartItem.quantity, 0),
    )
    setCartTotal(
      cartItems.reduce(
        (total, cartItem) => total + cartItem.quantity * cartItem.price,
        0,
      ),
    )
  }, [cartItems])

  const handleAddItemToCart = (productToAdd: Product) => {
    const isItemInCart = cartItems.some(
      (cartItem) => cartItem.id === productToAdd.id,
    )
    if (isItemInCart) {
      setCartItems((pV) =>
        pV.map((cartItem) =>
          cartItem.id === productToAdd.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        ),
      )
    } else {
      setCartItems((pV) => [...pV, { ...productToAdd, quantity: 1 }])
    }
  }

  const handleRemoveItemFromCart = (productIdToRemove: string) => {
    const isLastItemInCart =
      cartItems.find((cartItem) => cartItem.id === productIdToRemove)
        ?.quantity === 1
    if (isLastItemInCart) {
      setCartItems((pV) =>
        pV.filter((cartItem) => cartItem.id !== productIdToRemove),
      )
    } else {
      setCartItems((pV) =>
        pV.map((cartItem) =>
          cartItem.id === productIdToRemove
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem,
        ),
      )
    }
  }

  const handleDeleteItemFromCart = (productIdToDelete: string) => {
    setCartItems((pV) =>
      pV.filter((cartItem) => cartItem.id !== productIdToDelete),
    )
  }

  const cartState: CartState = {
    cartCount,
    cartItems,
    cartTotal,
    handleAddItemToCart,
    handleDeleteItemFromCart,
    handleRemoveItemFromCart,
  }

  return (
    <CartContext.Provider value={cartState}>{children}</CartContext.Provider>
  )
}
