import React from 'react'

export default function DefaultContainer({ children }) {

    return (
        <div className="container mx-auto px-4 md:px-10">
            {children}
        </div>
    )
}