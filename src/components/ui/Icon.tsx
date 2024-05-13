import shopingCart from '@/assets/shopping_cart.svg?react'
import { HTMLAttributes } from 'react'

const iconMap = {
  shopingCart,
}

type IconName = keyof typeof iconMap

type Props = HTMLAttributes<HTMLOrSVGElement> & {
  icon: IconName
}

const Icon = ({ icon, ...rest }: Props) => {
  const Icon = iconMap[icon]

  return <Icon {...rest} />
}

export default Icon
