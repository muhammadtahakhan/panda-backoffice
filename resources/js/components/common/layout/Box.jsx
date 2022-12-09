import React from 'react'
import classNames from 'classnames'

export default function Box({ children, inverted, className, ...props }) {
    return (
        <div className={ classNames('box my-4 border border-stone-200 rounded-lg p-8', className, {
            'bg-stone-100': !inverted,
            'bg-white': inverted,
        }) } {...props}>
            { children }
        </div>
    )
}