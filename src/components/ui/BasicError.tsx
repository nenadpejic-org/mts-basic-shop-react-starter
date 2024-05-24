import { ReactNode } from 'react'
import Paragraph from './Paragraph'

type Props = {
  children?: ReactNode
}

const BasicError = ({ children }: Props) => {
  return (
    <Paragraph className="mt-1 text-red-500" variant="md">
      {children}
    </Paragraph>
  )
}

export default BasicError
