import React from 'react'

export default function Label({ children, id }) {

    return (
        <label className="flex gap-2 items-center uppercase tracking-wide text-stone-700 text-xs font-bold mb-2 cursor-pointer" htmlFor={ id }>
            { children }
        </label>
    )
}