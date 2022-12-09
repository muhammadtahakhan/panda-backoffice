import React from 'react'
import SiteFooter from '../components/global/SiteFooter'
import SiteHeader from '../components/global/SiteHeader'

export default function DefaultLayout({ children }) {

    return (
        <div>
            <SiteHeader />
            <main className=" py-10 mt-10 bg-stone-50 overflow-x-hidden max-w-full">
                { children }
            </main>
            <SiteFooter />
        </div>
    )
}