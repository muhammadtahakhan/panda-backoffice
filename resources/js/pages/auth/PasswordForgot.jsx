import Box from '../../components/common/layout/Box'
import NarrowContainer from '../../components/common/layout/NarrowContainer'
import PageTitle from '../../components/common/typography/PageTitle'
import PasswordForgotForm from '../../components/auth/PasswordForgotForm'
import PasswordResetForm from '../../components/auth/PasswordResetForm'
import React from 'react'
import SiteTitle from '../../components/global/SiteTitle'
import Text from '../../components/common/typography/Text'

export default function PasswordForgot() {

    return (
        <NarrowContainer>
            <SiteTitle>Forgot Password</SiteTitle>
            <PageTitle>Forgot Your Password</PageTitle>
            <Text>Having trouble logging in or need to reset your password? Enter the email of the account in the form below, and if that account exists, you'll receive an email with instructions on how to complete your password reset.</Text>

            <Box>
                <PasswordForgotForm />
            </Box>
        </NarrowContainer>
    )
}