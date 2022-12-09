import React from 'react'
import classNames from 'classnames'

export default function Button({ children, icon, variant, size, className, ...props }) {

    const buttonClass = classNames(className,
        {
            'py-2 px-4 rounded-full border-2 flex gap-2 items-center font-bold transition transition-all duration-200': variant !== 'icon',
            'bg-stone-300 border-stone-300 text-stone-500 hover:bg-stone-600 hover:text-stone-200 hover:border-stone-600': variant === 'default' || !variant,
            'bg-stone-200 cursor-not-allowed text-slate-500': variant === 'disabled',
            'opacity-50 cursor-not-allowed': props?.disabled,
            'bg-orange-500 border-orange-500 text-white hover:bg-orange-300': variant === 'primary',
            'text-lg': size === 'lg',
            'py-1 px-2 text-sm': size === 'sm',
            'border-2 border-stone-500 text-stone-700 hover:bg-stone-600 hover:text-stone-200': variant === 'outline',
            'border-2 border-orange-500 text-orange-500 hover:bg-orange-300 hover:text-orange-900 hover:border-orange-300': variant === 'outline-primary',
            'p-4': variant === 'icon',
            'bg-orange-200 border-orange-200 text-orange-800': variant === 'light',
        }
    )

    return (
        <button
            className={ buttonClass }
            {...props}
            >   
            { children }
            { icon && <span>{ icon }</span> }
        </button>
    )
}