import { Link, useNavigate, useParams } from 'react-router-dom'
import React, { useState } from 'react'

import Button from '../common/forms/Button'
import FormRow from '../common/forms/FormRow'
import InputField from '../common/forms/InputField'
import Text from '../common/typography/Text'

export default function PasswordResetForm({ onDone }) {

    const navigate = useNavigate()

    // Get token from route params.
    const { token } = useParams();

    if (!token) {
        navigate('/forgot-password')
    }
    
    // Get email from query string.
    const urlParams = new URLSearchParams(window.location.search)
    const email = urlParams.get('email')

    const [submitting, setSubmitting] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
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

        window.axios.post('/api/password/reset', {
            email,
            token,
            password,    
            password_confirmation: passwordConfirmation,
        }).then(response => {
            if (onDone) {
                onDone()
            } else {
                navigate('/signin?reset=1')
            }
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
            <FormRow>
                <InputField
                    type="password"
                    name="password"
                    label="Password"
                    value={ password }
                    onChange={ value => setPassword(value) }
                    className="flex-1"
                    required
                    errors={ fieldErrors?.password }
                />
                <InputField
                    type="password"
                    name="password_confirmation"
                    label="Confirm Password"
                    value={ passwordConfirmation }
                    onChange={ value => setPasswordConfirmation(value) }
                    className="flex-1"
                    required
                    errors={ fieldErrors?.password_confirmation }
                />
            </FormRow>
            <FormRow centered>
                <Button 
                    variant="primary"
                    type="submit"
                    disabled={ submitting }
                >Reset Your Password</Button>
            </FormRow>
        </form>
    )
}