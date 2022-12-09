import React, { useEffect } from 'react'

import Alert from '../../components/common/notifications/Alert'
import Box from '../../components/common/layout/Box'
import LoginForm from '../../components/auth/LoginForm'
import NarrowContainer from '../../components/common/layout/NarrowContainer'
import PageTitle from '../../components/common/typography/PageTitle'
import SiteTitle from '../../components/global/SiteTitle'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Login() {

    const user = useSelector(state => state?.user?.user)
    const navigate = useNavigate()

    // Get reset from query string.
    const urlParams = new URLSearchParams(window.location.search);
    const reset = urlParams.get('reset');

    useEffect(() => {
        if (user) {
            navigate('/dashboard')
        }
    }, [])

    return (
        <NarrowContainer>
            <PageTitle>Login</PageTitle>

            { reset && (
                <Alert type="success">
                    Your password has been reset. Please login with your new password.
                </Alert>
            )}

            <Box>
                <LoginForm />
            </Box>
        </NarrowContainer>
    )
}