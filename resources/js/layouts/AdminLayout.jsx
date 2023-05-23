import React from 'react'
import { Outlet } from 'react-router-dom'
import Card from '../components/common/widgets/Card'
import Sidebar from '../components/global/Sidebar'
import SiteFooter from '../components/global/SiteFooter'
import SiteHeader from '../components/global/SiteHeader'

export default function AdminLayout({ children }) {

    return (

            <div>
            <SiteHeader />

            <main className=" h-screen bg-stone-200 overflow-x-hidden max-w-full  px-4">



            <Outlet />


            </main>
            <SiteFooter />
            </div>
    )
}
