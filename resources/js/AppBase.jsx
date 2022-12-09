import 'react-loading-skeleton/dist/skeleton.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React, { useState } from 'react'

import AppData from './components/global/AppData'
import { CookiesProvider } from 'react-cookie'
import Dashboard from './pages/Dashboard'
import DefaultLayout from './layouts/DefaultLayout'
import EmailNotVerifiedAlert from './components/common/notifications/EmailNotVerifiedAlert'
import Home from './pages/Home'
import IsLoggedInRoute from './components/routing/IsLoggedInRoute'
import Login from './pages/auth/Login'
import PageNotFound from './pages/PageNotFound'
import PasswordForgot from './pages/auth/PasswordForgot'
import PasswordReset from './pages/auth/PasswordReset'
import { Provider } from 'react-redux'
import Signup from './pages/auth/Signup'
import SignupComplete from './pages/auth/SignupComplete'
import SignupVerify from './pages/auth/SignupVerify'
import store from './store'

export default function AppBase() {

    const [loaded, setLoaded] = useState(false)

    return (
        <CookiesProvider>
            <Provider store={ store }>
                <AppData onDone={ () => setLoaded(true) } />

                { loaded && (
                    <BrowserRouter>
                        <DefaultLayout>

                            <EmailNotVerifiedAlert />
                            
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/signin" element={ <Login /> } />

                                <Route path="/signup" element={ <Signup /> } />
                                <Route path="/signup/complete" element={ <SignupComplete /> } />
                                <Route path="/signup/verify/:id/:hash" element={ <SignupVerify /> } />

                                <Route path="/forgot-password" element={ <PasswordForgot /> } />
                                <Route path="/password/reset/:token" element={ <PasswordReset /> } />

                                <Route path="/dashboard" element={ <IsLoggedInRoute><Dashboard /></IsLoggedInRoute> } />

                                <Route path="*" element={ <PageNotFound /> } />
                            </Routes>
                        </DefaultLayout>
                        
                    </BrowserRouter>
                )}
            </Provider>
        </CookiesProvider>
    )
}