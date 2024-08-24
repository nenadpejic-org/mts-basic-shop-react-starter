import { ComponentProps, ForwardedRef, forwardRef, useId } from 'react'
import { twMerge } from 'tailwind-merge'
import BasicError from './BasicError'
import BasicLabel from './BasicLabel'
import Icon from './Icon'

type Option = { value: string; label: string }

type RadioGroupProps = ComponentProps<'input'> & {
  options: Option[]
  error?: string
  label?: string
}

const RadioGroup = forwardRef(
  (
    { error, label, options, required, ...rest }: RadioGroupProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const id = useId()

    return (
      <div>
        {label && <BasicLabel required={required}>{label}</BasicLabel>}

        <div>
          {options.map((option, i) => {
            return (
              <label
                key={option.value}
                className={twMerge(
                  'flex w-fit cursor-pointer items-center text-gray-900',
                  rest.disabled && 'cursor-default',
                )}
                htmlFor={`${i}-${id}`}
              >
                <input
                  id={`${i}-${id}`}
                  className="peer hidden"
                  type="radio"
                  value={option.value}
                  ref={ref}
                  {...rest}
                />
                <Icon
                  className={twMerge(
                    'fill-blue-500 peer-disabled:fill-gray-400 [&_:last-child]:fill-transparent peer-checked:[&_:last-child]:fill-blue-500 peer-disabled:peer-checked:[&_:last-child]:fill-gray-400',
                    error && 'fill-red-500',
                  )}
                  icon={'radioButton'}
                />
                <span className="ml-2 text-gray-900">{option.label}</span>
              </label>
            )
          })}
        </div>

        {error && <BasicError>{error}</BasicError>}
      </div>
    )
  },
)

export default RadioGroup
