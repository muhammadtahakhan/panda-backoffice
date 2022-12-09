import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Alert from '../../components/common/notifications/Alert'
import NarrowContainer from '../../components/common/layout/NarrowContainer'
import PageTitle from '../../components/common/typography/PageTitle'
import React from 'react'
import Text from '../../components/common/typography/Text'
import { saveUser } from '../../redux/userSlice'
import { useDispatch } from 'react-redux'

export default function SignupVerify() {

    const dispatch = useDispatch()
    const [verified, setVerified] = useState(false)
    const { id, hash } = useParams()

    useEffect(() => {
        verifyEmail()
    }, [])

    const verifyEmail = () => {
        window.axios.post(`/api/register/verify/${id}/${hash}`)
            .then(response => {
                dispatch(saveUser(response?.data?.user))
                setVerified(true)
            }).catch(error => {
                console.log(error)
            })
    }

    return (
        <NarrowContainer>
            <PageTitle>Verify Your Email</PageTitle>

            { !verified ? (
                <Text>Just verifying your email address....</Text>
            ) : (
                <>
                    <Alert type="success" className="mb-4">Email verified! You're all good to go.</Alert>
                    <Text>Why don't you start by <Link to="/signin" className="text-orange-500 underline">Signing In</Link>?</Text>
                </>
            )}

        </NarrowContainer>
    )
}