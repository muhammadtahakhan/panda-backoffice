import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'

import Alert from '../common/notifications/Alert'
import Button from '../common/forms/Button'
import CheckboxField from '../common/forms/CheckboxField'
import FormRow from '../common/forms/FormRow'
import InputField from '../common/forms/InputField'
import Text from '../common/typography/Text'
import { saveUser } from '../../redux/userSlice'
import { useDispatch } from 'react-redux'

export default function LoginForm() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)
    const [formErrors, setFormErrors] = useState([])
    const [submitting, setSubmitting] = useState(false)

    const submit = async(e) => {
        e.preventDefault()
        setSubmitting(true)

        // Get the session cookie.
        try {
            window.axios.get('/sanctum/csrf-cookie')
        } catch (e) {
            console.error(e)
            setSubmitting(false)
        }

        window.axios.post('/api/login', {
            email,
            password,    
            remember,
        }).then(response => {
            if (response?.data?.success) {
                dispatch(saveUser(response?.data?.user))
                navigate('/dashboard')
            } else {
                setFormErrors(["Invalid credentials. Please verify your credentials and try again."])
                setSubmitting(false)
            }
        }).catch(error => {
            handleError(error)
        })
    }

    const handleError = error => {
        setFormErrors(["An unknown error has occurred. Please try again later."])
        setSubmitting(false)
    }

    return (
        <form onSubmit={ e => submit(e) } className="my-4">

            { formErrors.length > 0 && (
                <Alert className="mb-4">{ formErrors?.map(item => item) }</Alert>    
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
                />
            </FormRow>
            <FormRow>
                <InputField
                    type="password"
                    name="password"
                    label="Password"
                    value={ password }
                    onChange={ value => setPassword(value) }
                    required
                />
            </FormRow>
            <FormRow>
                <CheckboxField
                    name="remember"
                    label="Remember me"
                    value={ remember }
                    onChange={ value => setRemember(value) }
                />
            </FormRow>
            <FormRow centered>
                <div>
                    <Button 
                        variant="primary" 
                        type="submit"
                        disabled={ submitting }
                        icon={
                            submitting ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 animate-spin">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                </svg>

                            ) : null
                        }   
                    >Log In</Button>
                </div>
                <div>
                    <Link to="/signup" className="text-orange-700">Sign Up</Link>
                </div>
            </FormRow>

            <Text>Having trouble logging in? Try <Link to="/forgot-password" className="text-orange-500 underline">resetting your password</Link>.</Text>
        </form>
    )
}