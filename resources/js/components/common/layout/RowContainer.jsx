import React from 'react'
import classNames from 'classnames'
import '../../../../css/row.css'

export default function RowContainer( props ) {

    const {
        children,
        extraClasses,
    } = props

    const htmlClasses = classNames(
		{
			'row-container' : true,
			[ extraClasses ] : extraClasses,
		}
	) 

    return (
        <div className={ htmlClasses }>
            {children}
        </div>
    )
}