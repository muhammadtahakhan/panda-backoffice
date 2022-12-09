import { Link, useLocation } from 'react-router-dom'

import React from 'react'
import classNames from 'classnames'

export default function PrimaryNavItem({ children, to }) {

    const location = useLocation()

    return (
        <div>
            <Link 
                to={ to } 
                className={ classNames('font-bold', {
                    'text-orange-500': location?.pathname === to,
                    'text-stone-700 md:text-stone-500': location?.pathname !== to && location?.pathname !== '/',
                    'text-stone-700 md:text-stone-900': location?.pathname === '/'
                }) }
            >{ children }</Link>
        </div>
    )
}
