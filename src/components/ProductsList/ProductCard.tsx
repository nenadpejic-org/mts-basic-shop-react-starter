import Button from '@/components/ui/Button'
import Paragraph from '@/components/ui/Paragraph'
import { Product } from '@/services/products'

type Props = { product: Product }

const ProductCard = ({ product }: Props) => {
  const { image, name, price, stockQuantity } = product

  return (
    <li>
      <div className="relative">
        {stockQuantity < 5 && (
          <Paragraph
            className="absolute left-2 top-2 bg-gray-100 px-1.5 py-0.5 text-orange-600"
            variant="sm"
          >
            {stockQuantity} in stock
          </Paragraph>
        )}
        <img
          src={image}
          alt={name}
          className="aspect-[3/4] h-full w-full bg-gray-200 object-cover object-center"
        />
      </div>

      <Button
        className="w-full"
        onClick={() => {
          // TODO: handleAddItemToCart
        }}
      >
        Add to Cart
      </Button>

      <Paragraph className="mt-2" ellipsis>
        {name}
      </Paragraph>

      <Paragraph className="mt-1" variant="md-b">
        ${price} usd
      </Paragraph>
    </li>
  )
}

export default ProductCard
