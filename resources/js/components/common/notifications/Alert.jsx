import React from 'react'
import classNames from 'classnames'

export default function Alert({ type, children, className }) {

    return (
        <div className={ classNames('px-4 py-3 rounded relative', {
            'bg-red-100 border border-red-400 text-red-700 ': type === 'error' || !type,
            'bg-green-100 border border-green-400 text-green-700 ': type === 'success',
            'bg-orange-100 border border-orange-400 text-orange-700 ': type === 'warning',
        }, className) }>
            { children }
        </div>
    )
}