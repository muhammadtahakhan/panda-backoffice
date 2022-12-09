import React from 'react'

export default function FilePreview({ file, className }) {

    return (
        <div className={ className }>
            <img src={ file?.url } className="w-10 h-10 border border-stone-200" />
        </div>
    )
}