import React, { useEffect, useState } from 'react'

import ClickAwayListener from 'react-click-away-listener';
import classNames from 'classnames';

export default function Dropdown({ variant, children, className, label, header, onOpen }) {

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {

        const eventHandler = () => {
            setIsOpen(false)
        }

        window.addEventListener('dropdown-item-clicked', eventHandler)

        return () => {
            window.removeEventListener('dropdown-item-clicked', eventHandler)
        }
    })

    useEffect(() => {
        if (isOpen && onOpen) {
            onOpen()
        }
    }, [isOpen])

    return (
        <div className={`relative ${className}`}>

            <div className="relative">
                <button 
                    onClick={ e => setIsOpen(!isOpen) }
                    className={ classNames('flex items-center justify-between w-full rounded-md px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500', {
                        'border border-gray-300 shadow-sm ': variant !== 'no-button',
                    }) }
                >
                    <span>{label}</span>

                    { variant !== 'no-button' && (
                        <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5 8a1 1 0 011.707 0L10 11.293l3.293-3.294a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4A1 1 0 015 8z" clipRule="evenodd" />
                        </svg>
                    )}
                </button>
            </div>

            { isOpen && (
                <ClickAwayListener onClickAway={ e => setIsOpen(false) }>
                    <div className="origin-top-right absolute flex flex-col right-0 z-10 mt-2 w-56 max-h-96 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        { header && (
                            <header className="border-b border-stone-200 py-2 px-4">
                                { header }
                            </header>
                        )}
                            <div className="py-1 flex-1 overflow-y-auto" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                { children }
                            </div>
                    </div>
                </ClickAwayListener>
            )}
        </div>
        
    )
}