import React from 'react'
import classNames from 'classnames'

export default function Badge({ size, variant, children }) {

    return (
        <span 
            className={ classNames({
                'rounded-full text-sm flex': true,
                'px-4 py-1': size !== 'sm',
                'border-2 border-stone-300 text-stone-400': !variant,
                'border-2 border-white text-white': variant === 'outline-white',
                'bg-orange-300 text-orange-900': variant === 'primary',
                'text-xs py-1 px-1': size === 'sm',
            })}
        >{ children }</span>
    )
}