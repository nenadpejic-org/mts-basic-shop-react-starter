import { ComponentProps, ForwardedRef, forwardRef, useId } from 'react'
import { twMerge } from 'tailwind-merge'
import BasicError from './BasicError'
import BasicLabel from './BasicLabel'
import Icon from './Icon'

type Option = { value: string; label: string }

type SelectProps = ComponentProps<'select'> & {
  options: Option[]
  error?: string
  label?: string
}

const Select = forwardRef(
  (
    { error, label, options, required, ...rest }: SelectProps,
    ref: ForwardedRef<HTMLSelectElement>,
  ) => {
    const id = useId()

    return (
      <div>
        {label && (
          <BasicLabel htmlFor={id} required={required}>
            {label}
          </BasicLabel>
        )}

        <div>
          <div className="relative">
            <select
              id={id}
              className={twMerge(
                'w-full appearance-none border border-gray-400 bg-gray-50 px-4 py-2 pr-10 text-gray-900 placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50',
                error && 'border-red-500 outline-red-500',
              )}
              ref={ref}
              {...rest}
            >
              <option value={''} className="italic text-gray-500">
                None
              </option>
              {options.map((option) => (
                <option
                  key={option.value}
                  className="text-gray-900"
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
            <Icon
              className="absolute right-2 top-1/2 -translate-y-1/2"
              icon="keyboardArrowDown"
            />
          </div>
        </div>

        {error && <BasicError>{error}</BasicError>}
      </div>
    )
  },
)
export default Select
