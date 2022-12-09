import React, { memo } from 'react'

import SiteTitle from '../../global/SiteTitle'
import classNames from 'classnames'

function PageTitle({ metaTitle, className, children }) {
    return (
        <>
            <SiteTitle>{ metaTitle || children }</SiteTitle>
            <h1 className={ classNames(className, 'text-3xl text-slate-800 mb-4' ) }>
                { children }
            </h1>
        </>
    )
}

export default memo(PageTitle)