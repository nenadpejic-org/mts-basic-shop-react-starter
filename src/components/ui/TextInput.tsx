import { ComponentProps, ForwardedRef, forwardRef, useId } from 'react'
import { twMerge } from 'tailwind-merge'
import BasicInput from './BasicInput'
import BasicLabel from './BasicLabel'
import { IconName } from './Icon'

type TextInputProps = ComponentProps<'input'> & {
  error?: string
  full?: boolean
  iconBefore?: IconName
  inputClassName?: string
  label?: string
  ref?: ForwardedRef<HTMLInputElement>
}

const TextInput = forwardRef(
  (
    { className, inputClassName, label, required, ...rest }: TextInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const id = useId()

    return (
      <div className={twMerge('inline-block', className)}>
        {label && (
          <BasicLabel htmlFor={id} required={required}>
            {label}
          </BasicLabel>
        )}

        <BasicInput
          id={label && id}
          className={inputClassName}
          ref={ref}
          type="text"
          {...rest}
        />
      </div>
    )
  },
)
export default TextInput
