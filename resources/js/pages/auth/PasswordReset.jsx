import Box from '../../components/common/layout/Box'
import NarrowContainer from '../../components/common/layout/NarrowContainer'
import PageTitle from '../../components/common/typography/PageTitle'
import PasswordResetForm from '../../components/auth/PasswordResetForm'
import React from 'react'
import SiteTitle from '../../components/global/SiteTitle'
import Text from '../../components/common/typography/Text'

export default function PasswordReset() {

    return (
        <NarrowContainer>
            <SiteTitle>Reset Password</SiteTitle>
            <PageTitle>Reset Your Password</PageTitle>
            <Text>You're almost there! Set your new password below and you'll be all set to go.</Text>

            <Box>
                <PasswordResetForm />
            </Box>
        </NarrowContainer>
    )
}