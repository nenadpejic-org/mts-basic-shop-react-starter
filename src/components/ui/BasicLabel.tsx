import { ComponentProps } from 'react'

type Props = ComponentProps<'label'> & { required?: boolean }

const BasicLabel = ({ children, required, ...rest }: Props) => {
  return (
    <label className="mb-1 inline-block text-gray-900" {...rest}>
      {children}
      {required && <span className="ml-0.5 text-red-500">*</span>}
    </label>
  )
}

export default BasicLabel
