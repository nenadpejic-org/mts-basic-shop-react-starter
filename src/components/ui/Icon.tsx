import add from '@/assets/add.svg?react'
import close from '@/assets/close.svg?react'
import deleteIcon from '@/assets/delete.svg?react'
import remove from '@/assets/remove.svg?react'
import shopingCart from '@/assets/shopping_cart.svg?react'
import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

const placeholder = ({ className, ...props }: { className?: string }) => (
  <div className={twMerge('invisible h-6 w-6', className)} {...props} />
)

const iconMap = {
  add,
  close,
  delete: deleteIcon,
  placeholder,
  remove,
  shopingCart,
}

export type IconName = keyof typeof iconMap

type Props = HTMLAttributes<HTMLOrSVGElement> & {
  icon: IconName
}

const Icon = ({ icon, ...rest }: Props) => {
  const Icon = iconMap[icon]

  return <Icon {...rest} />
}

export default Icon
