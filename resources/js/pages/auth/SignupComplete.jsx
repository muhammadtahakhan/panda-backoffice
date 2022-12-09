import NarrowContainer from '../../components/common/layout/NarrowContainer'
import PageTitle from '../../components/common/typography/PageTitle'
import React from 'react'

export default function SignupComplete() {

    return (
        <NarrowContainer>
            <PageTitle>Thanks for signing up!</PageTitle>
            <p>We've gone ahead and sent you an email to verify your email address. Open the email, click the link, and you'll be good to go. If it's been a few minutes and you still haven't received that email from us (and it's not in your spam folder), use the button below to re-send that verification email.</p>
        </NarrowContainer>
    )
}