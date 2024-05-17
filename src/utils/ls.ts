import { CartItem } from '@/contexts/CartContext'

type LSKeyValueMap = {
  'cart-items': CartItem[]
}

type LSKey = keyof LSKeyValueMap

type LSValue<T extends LSKey> = LSKeyValueMap[T]

export const ls = {
  get: <T extends LSKey>(lsKey: T): null | LSValue<T> => {
    const value = localStorage.getItem(lsKey)
    if (value === null) return null
    try {
      return JSON.parse(value)
    } catch (error) {
      return null
    }
  },
  set: <T extends LSKey>(lsKey: T, value: LSValue<T>) =>
    localStorage.setItem(lsKey, JSON.stringify(value)),
  remove: (lsKey: LSKey) => localStorage.removeItem(lsKey),
}
