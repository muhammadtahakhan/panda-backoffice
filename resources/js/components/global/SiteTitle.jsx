import { Helmet } from "react-helmet"
import React from 'react'
import { titleTag } from '../../functions/SEO'

export default function SiteTitle({ children }) {

    return (
        <Helmet>
            <title>{ titleTag(children) }</title>
        </Helmet>
    )
}