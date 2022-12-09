import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'

import Button from '../common/forms/Button'
import CheckboxField from '../common/forms/CheckboxField'
import Divider from '../common/layout/Divider'
import FormRow from '../common/forms/FormRow'
import InputField from '../common/forms/InputField'
import Text from '../common/typography/Text'

export default function SignupForm() {

    const navigate = useNavigate()
    const [submitting, setSubmitting] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [enableMailingList, setEnableMailingList] = useState(false)
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

        window.axios.post('/api/register', {
            name,
            email,
            password,    
            password_confirmation: passwordConfirmation,
            enable_mailing_list: enableMailingList,
        }).then(response => {
            navigate('/signup/complete')
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
                    name="name"
                    label="Name"
                    value={ name }
                    onChange={ value => setName(value) }
                    autoFocus
                    required
                    errors={ fieldErrors?.name }
                />
            </FormRow>
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
            <Divider />
            <div className="mt-8"></div>
            <FormRow centered>
                <Button 
                    variant="primary"
                    type="submit"
                    disabled={ submitting }
                >Sign Up</Button>
                <div>
                    <Text className="mb-0">Already have an account? <Link to="/signin" className="text-orange-700 underline">Sign In</Link></Text>
                </div>
            </FormRow>
        </form>
    )
}