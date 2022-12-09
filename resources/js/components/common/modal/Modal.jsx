import React, { useState } from 'react'

import Text from '../typography/Text'
import classNames from 'classnames'

export default function Modal({ children, onClose, size }) {

    const [showCloseLabel, setShowCloseLabel] = useState(false)

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className={ classNames('bg-white rounded-lg shadow-lg p-8 max-h-full overflow-y-auto', {
                'max-w-2xl w-full': !size,
                'md:w-3/4 lg:w-3/5': size === 'lg',
                'md:w-full md:mx-10': size === 'xl',
            })}>
                <div className="flex justify-end">
                    <div 
                        className="cursor-pointer text-xl text-slate-500 hover:text-slate-600 transition-all duration-200 flex items-center gap-2"
                        onClick={ onClose }
                        onMouseOver={ () => setShowCloseLabel(true) }
                        onMouseOut={ () => setShowCloseLabel(false) }
                    >
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8">
                                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                            </svg>
                        </div>

                        <div className={ classNames({
                            'overflow-x-hidden transition-all duration-200 mb-0 text-xs': true,
                            'w-0': !showCloseLabel,
                            'w-12': showCloseLabel,
                        }) }>CLOSE</div>
                    </div>
                </div>
                { children }
            </div>
        </div>
    )
}