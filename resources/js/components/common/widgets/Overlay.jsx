import React from 'react'
import classNames from 'classnames'

export default function Overlay({ rounded, children }) {

    return (
        <div 
            className={ classNames({
                'absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10': true,
                'rounded-lg': rounded,
            })}
        >
            {children}
        </div>
    )
}