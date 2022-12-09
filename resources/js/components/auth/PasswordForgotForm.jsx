import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'

import Alert from '../common/notifications/Alert'
import Button from '../common/forms/Button'
import FormRow from '../common/forms/FormRow'
import InputField from '../common/forms/InputField'
import Text from '../common/typography/Text'

export default function PasswordForgotForm() {

    const navigate = useNavigate()
    const [submitting, setSubmitting] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [email, setEmail] = useState('')
    const [fieldErrors, setFieldErrors] = useState({})

    const submit = async(e) => {
        e.preventDefault()
        setSubmitting(true)

        // Get the session cookie.
        try {
            window.axios.get('/sanctum/csrf-cookie')
        } catch (e) {
            console.error(e)
        }

        window.axios.post('/api/password', {
            email,
        }).then(response => {
            setShowSuccess(true)
            setEmail('')
            setSubmitting(false)
        }).catch(error => {
            setSubmitting(false)
            handleError(error)
        })
    }

    const handleError = error => {
        setFieldErrors(error?.response?.data?.errors)
    }

    return (
        <form onSubmit={ e => submit(e) } className="my-4">

            { showSuccess && (
                <Alert type="success" className="mb-4">
                    If an account exists with that email address, you'll receive an email with instructions on how to reset your password.
                </Alert>    
            )}

            <FormRow>
                <InputField
                    type="email"
                    name="email"
                    label="Email"
                    value={ email }
                    onChange={ value => setEmail(value) }
                    autoFocus
                    required
                    errors={ fieldErrors?.email }
                />
            </FormRow>
            <FormRow centered>
                <Button 
                    variant="primary"
                    type="submit"
                    disabled={ submitting }
                >Submit</Button>
            </FormRow>
        </form>
    )
}