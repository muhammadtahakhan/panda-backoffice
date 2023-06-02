import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Card from '../components/common/widgets/Card'
import Sidebar from '../components/global/Sidebar'
import SiteFooter from '../components/global/SiteFooter'
import SiteHeader from '../components/global/SiteHeader'
import { fetchPartners } from '../redux/partnerSlice'
import { fetchProducts } from '../redux/productSlice'

export default function AdminLayout({ children }) {

    const dispatch = useDispatch();

    useEffect(()=>{  dispatch(fetchPartners());  dispatch(fetchProducts()) },[])

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
