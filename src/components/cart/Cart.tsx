import { useCart } from '@/hooks/useCart'
import Drawer from '../ui/Drawer'
import Icon from '../ui/Icon'
import Heading from '../ui/Heading'
import Button from '../ui/Button'
import Paragraph from '../ui/Paragraph'
import { CartList } from './CartList'
import useScreen from '@/hooks/useScreen'

type Props = {
  className?: string
}

const Cart = ({ className }: Props) => {
  const { cartCount, cartTotal } = useCart()
  const { isMobile } = useScreen()

  return (
    <Drawer
      anchor={isMobile ? 'bottom' : 'right'}
      triggerClassName={className}
      trigger={
        <div className="relative flex h-8 w-8 items-center justify-center">
          <Icon icon="shopingCart" />
          {!!cartCount && (
            <span className="absolute right-0 top-0 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-blue-500 text-[10px] font-semibold text-white">
              {cartCount}
            </span>
          )}
        </div>
      }
      contentClassName="min-h-[250px] md:min-w-[320px]"
      header={<Heading as="h2">Shopping Cart</Heading>}
      footer={
        !!cartTotal && (
          <Button className="w-full">
            <Paragraph
              className="flex items-center justify-between text-white"
              variant="lg"
            >
              <span>Checkout</span>
              <span>${cartTotal}</span>
            </Paragraph>
          </Button>
        )
      }
    >
      <CartList />
    </Drawer>
  )
}

export { Cart }
