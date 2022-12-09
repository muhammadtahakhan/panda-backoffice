import React, { memo } from 'react'
import classNames from 'classnames'

function SmallTitle({ centered, noMargin, className, children }) {
    return (
        <h2 
            className={ classNames( className, {
                'text-xl text-slate-800': true,
                'mb-4': !noMargin,
                'text-center': centered,
            })}
        >{ children }</h2>
    )
}

export default memo(SmallTitle)