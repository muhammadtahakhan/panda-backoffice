import 'react-loading-skeleton/dist/skeleton.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React, { useState } from 'react'

import AppData from './components/global/AppData'
import { CookiesProvider } from 'react-cookie'
import DefaultLayout from './layouts/DefaultLayout'
import EmailNotVerifiedAlert from './components/common/notifications/EmailNotVerifiedAlert'
import Home from './pages/Home'
import IsLoggedInRoute from './components/routing/IsLoggedInRoute'
import { Provider } from 'react-redux'
import Signup from './pages/auth/Signup'
import SignupComplete from './pages/auth/SignupComplete'
import SignupVerify from './pages/auth/SignupVerify'
import store from './store'

// ========================Pages
import Login from './pages/auth/Login'
import PageNotFound from './pages/PageNotFound'
import PasswordForgot from './pages/auth/PasswordForgot'
import PasswordReset from './pages/auth/PasswordReset'

import Dashboard from './pages/Dashboard'
import Sales from './pages/sales/sales'

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";
import AdminLayout from './layouts/AdminLayout'
import Partners from './pages/partners/partners'
import Products from './pages/products/products'


export default function AppBase() {

    const [loaded, setLoaded] = useState(false)

    return (
        <CookiesProvider>
            <Provider store={ store }>
                <AppData onDone={ () => setLoaded(true) } />

                { loaded && (
                    <BrowserRouter>
                        {/* <DefaultLayout> */}

                            {/* <EmailNotVerifiedAlert /> */}

                            <Routes>
                                <Route path="/" element={<Login />} />
                                <Route path="/signin" element={ <Login /> } />

                                <Route path="/signup" element={ <Signup /> } />
                                <Route path="/signup/complete" element={ <SignupComplete /> } />
                                <Route path="/signup/verify/:id/:hash" element={ <SignupVerify /> } />

                                <Route path="/forgot-password" element={ <PasswordForgot /> } />
                                <Route path="/password/reset/:token" element={ <PasswordReset /> } />

                                {/* <Route path="/dashboard" element={ <IsLoggedInRoute><AdminLayout /></IsLoggedInRoute> } /> */}
                                <Route path="/dashboard" element={ <AdminLayout /> } >

                                    <Route index element={ <Dashboard />} />
                                    <Route path="sales" element={ <IsLoggedInRoute><Sales /></IsLoggedInRoute> } />
                                    <Route path="partners" element={ <IsLoggedInRoute><Partners /></IsLoggedInRoute> } />
                                    <Route path="products" element={ <IsLoggedInRoute><Products /></IsLoggedInRoute> } />

                                </Route>


                                <Route path="*" element={ <PageNotFound /> } />
                            </Routes>
                        {/* </DefaultLayout> */}

                    </BrowserRouter>
                )}
            </Provider>
        </CookiesProvider>
    )
}
