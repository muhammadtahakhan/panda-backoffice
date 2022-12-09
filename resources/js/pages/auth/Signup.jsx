import Box from '../../components/common/layout/Box'
import NarrowContainer from '../../components/common/layout/NarrowContainer'
import PageTitle from '../../components/common/typography/PageTitle'
import React from 'react'
import SignupForm from '../../components/auth/SignupForm'

export default function Signup() {

    return (
        <NarrowContainer>
            <PageTitle>Sign Up</PageTitle>

            <Box>
                <SignupForm />
            </Box>
        </NarrowContainer>
    )
}