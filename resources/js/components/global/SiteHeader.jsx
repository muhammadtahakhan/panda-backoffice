import { Link, useLocation } from 'react-router-dom'

import Button from '../common/forms/Button'
import Divider from '../common/layout/Divider'
import Dropdown from '../common/menu/Dropdown'
import DropdownItem from '../common/menu/DropdownItem'
import DropdownTitle from '../common/menu/DropdownTitle'
import PrimaryNavItem from '../common/menu/PrimaryNavItem'
import React from 'react'
import classNames from 'classnames'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'

export default function SiteHeader() {

    const user = useSelector(state => state?.user?.user)
    const [open, setOpen] = useState(false)
    const location = useLocation()

    const logoutHandler = done => {
        window.axios.post('/api/logout')
            .then(response => {
                window.location.href = "/"
                done()
            }).catch(error => console.error(error))
    }

    useEffect(() => {
        setOpen(false)
    }, [location])

    return (
        <header className="shadow relative z-30">
            <div className="container mx-auto flex py-2 items-center h-20">
                <div className="w-full md:w-40 flex items-center px-4 md:px-0">
                    <Link to="/">
                        <div className="text-2xl relative font-bold">
                            Laravel<span className="text-orange-400">React</span>
                        </div>
                    </Link>

                    <div className="ml-auto md:hidden">
                        <Button onClick={ () => setOpen(!open)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                            </svg>
                        </Button>
                    </div>
                </div>
                <div className={ classNames('fixed top-0 bottom-0 w-4/5 p-4 md:p-0 md:w-auto md:relative md:flex-1 md:flex md:pl-20 items-center transition-all duration-200 z-50 bg-stone-200 md:bg-transparent', {
                    '-left-full md:left-0': !open,
                    'left-0': open
                }) }>
                    <header className="flex">
                        <Button className="md:hidden text-black ml-auto" onClick={ () => setOpen(!open) }>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </Button>
                    </header>
                    <nav className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                        { user && (
                            <PrimaryNavItem to="/dashboard">Dashboard</PrimaryNavItem>
                        )}
                    </nav>
                    { !user && (
                        <div className="md:ml-auto mt-8 md:mt-0 flex gap-2">
                            <Link to="/signin">
                                <Button variant="outline">Log In</Button>
                            </Link>
                            
                            <Link to="/signup">
                                <Button variant="primary">Sign Up</Button>
                            </Link>
                        </div>
                    )}
                    { user && (
                        <div className="mt-4 md:mt-0 flex flex-col md:ml-auto md:flex-row gap-4 md:gap-2">
                            <Dropdown label={
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z" clipRule="evenodd" />
                                </svg>
                            }>
                                { user && (
                                    <>
                                        <Link to="/user/account">
                                            <DropdownItem 
                                                icon={
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z" clipRule="evenodd" />
                                                    </svg>
                                                } 
                                            >
                                                Account
                                            </DropdownItem>
                                        </Link>
                                        <Divider />
                                        <DropdownTitle>Admin</DropdownTitle>
                                        <Link to="/templates/create">
                                            <DropdownItem
                                                icon={
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                        <path fillRule="evenodd" d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zM10 8a.75.75 0 01.75.75v1.5h1.5a.75.75 0 010 1.5h-1.5v1.5a.75.75 0 01-1.5 0v-1.5h-1.5a.75.75 0 010-1.5h1.5v-1.5A.75.75 0 0110 8z" clipRule="evenodd" />
                                                    </svg>
                                                } 
                                            >
                                                Create Template
                                            </DropdownItem>
                                        </Link>
                                        <Link to="/render-jobs/all">
                                            <DropdownItem
                                                icon={
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                                                    </svg>

                                                } 
                                            >
                                                All Render Jobs
                                            </DropdownItem>
                                        </Link>
                                        <Link to="/users">
                                            <DropdownItem
                                                icon={
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                                    </svg>
                                                } 
                                            >
                                                Users
                                            </DropdownItem>
                                        </Link>
                                        <Link to="/render-clients">
                                            <DropdownItem
                                                icon={
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
                                                    </svg>
                                                } 
                                            >
                                                Render Clients
                                            </DropdownItem>
                                        </Link>
                                        <Divider />
                                    </>
                                )}
                                <DropdownItem 
                                    onClick={ logoutHandler }
                                    icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z" clipRule="evenodd" />
                                            <path fillRule="evenodd" d="M19 10a.75.75 0 00-.75-.75H8.704l1.048-.943a.75.75 0 10-1.004-1.114l-2.5 2.25a.75.75 0 000 1.114l2.5 2.25a.75.75 0 101.004-1.114l-1.048-.943h9.546A.75.75 0 0019 10z" clipRule="evenodd" />
                                        </svg>
                                    }
                                >
                                    Log Out
                                </DropdownItem>
                            </Dropdown>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}