import Alert from './Alert'
import Button from '../forms/Button'
import Modal from '../modal/Modal'
import PageTitle from '../typography/PageTitle'
import React from 'react'
import Text from '../typography/Text'
import { useSelector } from 'react-redux'
import { useState } from 'react'

export default function EmailNotVerifiedAlert() {

    const user = useSelector(state => state.user?.user)
    const [showModal, setShowModal] = useState(false)

    const resendVerificationEmail = () => {
        window.axios.post('/api/register/resend-verification-email?email=' + user.email)
            .then(response => {
                setShowModal(true)
            })
    }

    return (
        <>
            { user && !user.email_verified_at && (
                <Alert type="warning" className="mb-8 flex gap-4 items-center">
                    It looks like you haven't verified your email yet. Please check your inbox for a verification email. 
                    <div className="ml-auto">
                        <Button variant="primary" onClick={ resendVerificationEmail }>Send Again</Button>
                    </div>
                </Alert>
            )}

            { showModal && (
                <Modal onClose={ () => setShowModal(false) }>
                    <PageTitle>Email Sent!</PageTitle>
                    <Text>We've sent another verification email to <span className="font-bold underline">{ user?.email }</span> which you should be receiving in a few minutes. Please check that email for further instructions.</Text>
                </Modal>    
            )}
        </>
    )

}