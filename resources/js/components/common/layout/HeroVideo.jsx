import '../../../../css/hero.css'

import React from 'react'
import classNames from 'classnames'

export default function HeroVideo( props ) {

    const {
        children,
        video,
        extraClasses,
    } = props

    const htmlClasses = classNames(
        {
            'hero' : true,
            'video' : video,
            [ extraClasses ] : extraClasses,
        }
    )

    const videoUrl = `https://player.vimeo.com/video/${ video }?background=1&loop=0`

    return (
        <div className={ htmlClasses }>
            <div className="embed-wrapper">
                <iframe className="video-embed" src={ videoUrl } width="640" height="360" frameBorder="0" allow="autoplay"></iframe>
                <div className="content">
                    { children }
                </div>
            </div>
        </div>
    )
}