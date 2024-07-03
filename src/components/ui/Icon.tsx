import add from '@/assets/add.svg?react'
import attachMoney from '@/assets/attach_money.svg?react'
import checkBox from '@/assets/check_box.svg?react'
import checkBoxOutlineBlank from '@/assets/check_box_outline_blank.svg?react'
import close from '@/assets/close.svg?react'
import deleteIcon from '@/assets/delete.svg?react'
import keyboardArrowDown from '@/assets/keyboard_arrow_down.svg?react'
import keyboardArrowUp from '@/assets/keyboard_arrow_up.svg?react'
import moreVert from '@/assets/more_vert.svg?react'
import radioButtonChecked from '@/assets/radio_button_checked.svg?react'
import radioButtonUnchecked from '@/assets/radio_button_unchecked.svg?react'
import remove from '@/assets/remove.svg?react'
import search from '@/assets/search.svg?react'
import shopingCart from '@/assets/shopping_cart.svg?react'
import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

const placeholder = ({ className, ...props }: { className?: string }) => (
  <div className={twMerge('invisible h-6 w-6', className)} {...props} />
)

const iconMap = {
  add,
  attachMoney,
  checkBox,
  checkBoxOutlineBlank,
  close,
  delete: deleteIcon,
  keyboardArrowDown,
  keyboardArrowUp,
  moreVert,
  placeholder,
  radioButtonChecked,
  radioButtonUnchecked,
  remove,
  search,
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
