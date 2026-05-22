import { ArrowUpRight } from '@phosphor-icons/react'
import { forwardRef } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  arrow?: boolean
  as?: 'button'
}

interface AnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant
  size?: Size
  arrow?: boolean
  as: 'a'
  href: string
}

type Props = ButtonProps | AnchorProps

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm gap-2',
  md: 'px-6 py-3 text-sm gap-2.5',
  lg: 'px-8 py-4 text-base gap-3',
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-espresso-800 text-cream-50 hover:bg-espresso-700 active:scale-[0.98] shadow-warm-sm',
  secondary:
    'bg-cream-100 text-espresso-800 border border-espresso-800/15 hover:bg-cream-200 active:scale-[0.98]',
  ghost:
    'text-espresso-800 hover:bg-espresso-800/6 active:scale-[0.98]',
}

const ArrowBadge = () => (
  <span className="w-7 h-7 rounded-full bg-cream-50/15 flex items-center justify-center transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
    <ArrowUpRight size={14} weight="bold" />
  </span>
)

const baseClasses =
  'group inline-flex items-center justify-center font-body font-semibold rounded-pill transition-all duration-300 ease-out-expo focus-visible:outline-offset-2 select-none cursor-pointer'

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(
  function Button(props, ref) {
    const {
      variant = 'primary',
      size = 'md',
      arrow = false,
      children,
      className = '',
      ...rest
    } = props

    const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`

    if ((rest as AnchorProps).as === 'a') {
      const { as: _as, ...anchorRest } = rest as AnchorProps
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          {...anchorRest}
        >
          {children}
          {arrow && <ArrowBadge />}
        </a>
      )
    }

    const { as: _as, ...buttonRest } = rest as ButtonProps & { as?: 'button' }
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...buttonRest}
      >
        {children}
        {arrow && <ArrowBadge />}
      </button>
    )
  }
)

export default Button
