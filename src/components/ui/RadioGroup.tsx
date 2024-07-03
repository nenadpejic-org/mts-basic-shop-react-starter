import {
  ChangeEvent,
  ComponentProps,
  ForwardedRef,
  forwardRef,
  useId,
  useState,
} from 'react'
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
    {
      error,
      label,
      onChange,
      options,
      required,
      value,
      ...rest
    }: RadioGroupProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const id = useId()
    const [checkedValue, setCheckedValue] = useState('')

    return (
      <div ref={ref}>
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
                  className="hidden"
                  type="radio"
                  value={option.value}
                  checked={(value || checkedValue) === option.value}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const { value } = e.target
                    onChange?.(e) || setCheckedValue(value)
                  }}
                  {...rest}
                />
                <Icon
                  className={twMerge(
                    'fill-blue-500',
                    error && 'fill-red-500',
                    rest.disabled && 'fill-gray-400',
                  )}
                  icon={
                    (value || checkedValue) === option.value
                      ? 'radioButtonChecked'
                      : 'radioButtonUnchecked'
                  }
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
