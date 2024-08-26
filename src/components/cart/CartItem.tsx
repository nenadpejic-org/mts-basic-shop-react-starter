import { type CartItem } from '@/contexts/CartContext'
import { useCartContext } from '@/hooks/useCartContext'
import Paragraph from '../ui/Paragraph'
import Button from '../ui/Button'

type Props = {
  cartItem: CartItem
}

const CartItem = ({ cartItem }: Props) => {
  const { id, image, name, price, quantity, stockQuantity } = cartItem
  const {
    handleAddItemToCart,
    handleDeleteItemFromCart,
    handleRemoveItemFromCart,
  } = useCartContext()

  return (
    <li className="flex gap-4">
      <img
        src={image}
        alt={name}
        className="aspect-[3/4] h-full w-[80px] bg-gray-200 object-cover object-center"
      />

      <div className="flex max-w-[200px] flex-col">
        <Paragraph ellipsis>{name}</Paragraph>

        <Paragraph variant="md-b">${price} USD</Paragraph>

        {stockQuantity < 5 && (
          <Paragraph variant="sm" className="mt-1 text-orange-600">
            {stockQuantity} in stock
          </Paragraph>
        )}

        <div className="mt-auto flex items-center">
          <Button
            variant="icon"
            icon="remove"
            onClick={() => handleRemoveItemFromCart(id)}
          />
          <Paragraph className="mx-2">{quantity}</Paragraph>
          <Button
            variant="icon"
            icon="add"
            onClick={() => handleAddItemToCart(cartItem)}
          />
        </div>
      </div>

      <Button
        className="ml-auto self-start"
        variant="icon"
        icon="delete"
        onClick={() => handleDeleteItemFromCart(id)}
      />
    </li>
  )
}

export default CartItem
