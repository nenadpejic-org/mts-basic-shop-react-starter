import { ComponentProps, ForwardedRef, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import BasicError from './BasicError'
import Icon, { IconName } from './Icon'

type Props = ComponentProps<'input'> & {
  error?: string
  iconAfter?: IconName
  iconBefore?: IconName
}

const BasicInput = forwardRef(
  (
    { className, error, iconAfter, iconBefore, id, ...rest }: Props,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <div>
        <div className="relative">
          {iconBefore && (
            <Icon
              className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2"
              icon={iconBefore}
            />
          )}
          <input
            id={id}
            className={twMerge(
              'w-full border border-gray-400 bg-gray-50 px-4 py-2 text-gray-900 placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50',
              iconAfter && 'pr-10',
              iconBefore && 'pl-10',
              error && 'border-red-500 outline-red-500',
              className,
            )}
            ref={ref}
            type="text"
            {...rest}
          />
          {iconAfter && (
            <Icon
              className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2"
              icon={iconAfter}
            />
          )}
        </div>
        {error && <BasicError>{error}</BasicError>}
      </div>
    )
  },
)

export default BasicInput
