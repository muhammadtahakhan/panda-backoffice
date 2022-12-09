import React from 'react'

export default function DropdownTitle({ children, icon }) {

    return (
        <div className="py-2 px-4 flex gap-2 items-center text-xs uppercase text-stone-500 bold">
            { icon && <span>{ icon }</span> }
            { children }
        </div>
    )
}