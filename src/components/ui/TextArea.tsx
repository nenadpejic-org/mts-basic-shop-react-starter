import { ComponentProps, ForwardedRef, forwardRef, useId } from 'react'
import { twMerge } from 'tailwind-merge'
import BasicError from './BasicError'
import BasicLabel from './BasicLabel'

type TextAreaProps = ComponentProps<'textarea'> & {
  error?: string
  label?: string
  textareaClassName?: string
}

const TextArea = forwardRef(
  (
    {
      className,
      error,
      label,
      required,
      textareaClassName,
      ...rest
    }: TextAreaProps,
    ref: ForwardedRef<HTMLTextAreaElement>,
  ) => {
    const id = useId()

    return (
      <div className={className}>
        {label && (
          <BasicLabel htmlFor={id} required={required}>
            {label}
          </BasicLabel>
        )}

        <textarea
          id={label && id}
          className={twMerge(
            'w-full border border-gray-400 bg-gray-50 px-4 py-2 text-gray-900 placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500',
            textareaClassName,
          )}
          ref={ref}
          cols={22}
          rows={3}
          {...rest}
        />

        {error && <BasicError>{error}</BasicError>}
      </div>
    )
  },
)

export default TextArea
