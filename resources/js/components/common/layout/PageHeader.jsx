import NarrowContainer from '../layout/NarrowContainer'
import React from 'react'

export default function PageHeader({ children }) {
    return (
        <div className="mb-20">
            <NarrowContainer>
                {children}
            </NarrowContainer>
        </div>
    )
}