import React from 'react'
import Sidebar from '../../global/Sidebar'
import SiteFooter from '../../global/SiteFooter'
import SiteHeader from '../../global/SiteHeader'

export default function DefaultContainer({ children }) {

    return (

                <>

                <SiteHeader />
                <Sidebar />
                    <div className="flex flex-row">

                        <div className="p-4 text-white bg-red-500 rounded">1</div>
                        <div className="">
                                <div className="container mx-auto px-4 md:px-10">
                                    {children}
                                </div>
                        </div>

                    </div>
                <SiteFooter />

                </>

    )
}
