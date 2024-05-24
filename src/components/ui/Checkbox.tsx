import {
  ComponentProps,
  ForwardedRef,
  forwardRef,
  useId,
  useState,
} from 'react'
import { twMerge } from 'tailwind-merge'
import BasicError from './BasicError'
import Icon from './Icon'

type CheckboxProps = ComponentProps<'input'> & {
  error?: string
  label?: string
  ref?: ForwardedRef<HTMLInputElement>
  value?: boolean
}

const Checkbox = forwardRef(
  (
    {
      className,
      defaultChecked,
      error,
      label,
      onChange,
      required,
      value,
      ...rest
    }: CheckboxProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const [isChecked, setIsChecked] = useState<boolean>(!!defaultChecked)
    const id = useId()

    return (
      <div className={className}>
        <label
          className={twMerge(
            'inline-flex cursor-pointer items-center',
            rest.disabled && 'cursor-default',
          )}
          htmlFor={id}
        >
          <input
            id={id}
            className="hidden"
            ref={ref}
            type="checkbox"
            checked={value || isChecked}
            onChange={(e) => {
              onChange?.(e) || setIsChecked(e.target.checked)
            }}
            {...rest}
          />
          <Icon
            className={twMerge(
              'fill-blue-500',
              error && 'fill-red-500',
              rest.disabled && 'fill-gray-400',
            )}
            icon={value || isChecked ? 'checkBox' : 'checkBoxOutlineBlank'}
          />

          {label && <span className="ml-2 text-gray-900">{label}</span>}
          {required && <span className="ml-0.5 text-red-500">*</span>}
        </label>

        {error && <BasicError>{error}</BasicError>}
      </div>
    )
  },
)

export default Checkbox
