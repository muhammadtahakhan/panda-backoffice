import React from 'react'

export default function DropdownItem({ children, onClick, icon }) {

    const clickHandler = () => {

        if (onClick) {
            onClick()
        }

        const event = new CustomEvent('dropdown-item-clicked')
        window.dispatchEvent(event)
    }

    return (
        <div 
            className="py-2 px-4 hover:bg-slate-200 transition-all duration-200 cursor-pointer flex gap-2 items-center" 
            onClick={ clickHandler }
        >
            { icon && <span>{ icon }</span> }
            { children }
        </div>
    )
}