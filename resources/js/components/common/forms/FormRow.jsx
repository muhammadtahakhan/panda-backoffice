import React from 'react'
import classNames from 'classnames'

export default function FormRow({ centered, children }) {

    return (
        <div className={ classNames({ 
            'flex flex-wrap mb-4 gap-4': true,
            'items-center': centered,
        })}>
            { children }
        </div>
    )
}