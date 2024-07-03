import { ComponentProps, ForwardedRef, forwardRef, useId } from 'react'
import BasicInput from './BasicInput'
import BasicLabel from './BasicLabel'
import { IconName } from './Icon'

type NumberInputProps = ComponentProps<'input'> & {
  error?: string
  iconBefore?: IconName
  inputClassName?: string
  label?: string
}

const NumberInput = forwardRef(
  (
    { className, inputClassName, label, required, ...rest }: NumberInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const id = useId()

    return (
      <div className={className}>
        {label && (
          <BasicLabel htmlFor={id} required={required}>
            {label}
          </BasicLabel>
        )}

        <BasicInput
          id={label && id}
          className={inputClassName}
          ref={ref}
          type="number"
          step={1}
          {...rest}
        />
      </div>
    )
  },
)

export default NumberInput
