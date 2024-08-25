import { ComponentProps, ForwardedRef, forwardRef, useId } from 'react'
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
    { className, error, label, required, ...rest }: CheckboxProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const id = useId()

    return (
      <div className={className}>
        <label
          className={twMerge(
            'inline-flex cursor-pointer items-center',
            rest.disabled && 'cursor-not-allowed',
          )}
          htmlFor={id}
        >
          <input
            id={id}
            className="peer hidden"
            ref={ref}
            type="checkbox"
            {...rest}
          />
          <Icon
            className={twMerge(
              'fill-blue-500 peer-disabled:fill-gray-400 [&_:last-child]:fill-transparent peer-checked:[&_:last-child]:fill-blue-500 peer-disabled:peer-checked:[&_:last-child]:fill-gray-400',
              error && 'fill-red-500',
            )}
            icon="checkBox"
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
