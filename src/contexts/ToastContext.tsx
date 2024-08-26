import Paragraph from '@/components/ui/Paragraph'
import { ReactNode, createContext, useState } from 'react'

const messageMap = {
  default: Paragraph,
  success: ({ children }: { children: ReactNode }) => (
    <Paragraph className="text-green-500">{children}</Paragraph>
  ),
  error: ({ children }: { children: ReactNode }) => (
    <Paragraph className="text-red-500">{children}</Paragraph>
  ),
}

type Toast = {
  id: string
  message: string
  type: 'default' | 'success' | 'error'
}

type ToastContextProps = {
  toast: (message: string, type?: Toast['type']) => void
}

export const ToastContext = createContext<ToastContextProps>({
  toast: () => {},
})

type ToastProviderProps = {
  children?: ReactNode
}

export const ToastContextProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = (message: string, type: Toast['type'] = 'default') =>
    setToasts((pV) => [...pV, { id: `toast-${Math.random()}`, message, type }])

  const deleteTostById = (id: string) =>
    setToasts((pV) => pV.filter((v) => v.id !== id))

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {!!toasts.length && (
        <ul className="fixed right-0 top-0 z-10 flex flex-col items-end gap-2 p-6">
          {toasts.map((t) => {
            return (
              <li
                key={t.id}
                className="animate-toast bg-gray-50 px-4 py-2 shadow-md"
                onAnimationEnd={() => deleteTostById(t.id)}
              >
                {messageMap[t.type]({ children: t.message })}
              </li>
            )
          })}
        </ul>
      )}
    </ToastContext.Provider>
  )
}
