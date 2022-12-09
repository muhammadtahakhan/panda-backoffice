import React from 'react'

export default function NarrowContainer({ children }) {

    return (
        <div className="px-4 md:w-1/2 mx-auto">
            { children }
        </div>
    )
}