import React from 'react'

export default function List({ children }) {

    return (
        <ul className="list-disc ml-12 mb-4">
            { children }
        </ul>
    )
}