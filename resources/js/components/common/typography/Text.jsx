import React from 'react'
import classNames from 'classnames'

export default function Text({ size, variant, centered, children, className, ...props }) {
    return (
        <p 
            className={ classNames( 'mb-4', className, {
                'text-sm': size === 'sm',
                'text-xs': size === 'xs',
                'text-lg': size === 'lg',
                'text-xs italic': variant === 'caption',
                'text-center': centered,
                'text-red-500': variant === 'error',
                'text-white': variant === 'reverse', 
            })}
            {...props}
        >
            { children }
        </p>
    )
}