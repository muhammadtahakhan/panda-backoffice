import ProtectedRoute from './ProtectedRoute'
import React from 'react'
import { useSelector } from 'react-redux'

export default function IsLoggedInRoute({ redirectPath = "/", children }) {

    const user = useSelector(state => state?.user?.user)

    return (
        <ProtectedRoute
            redirectPath={ redirectPath }
            isAllowed={
                user && user?.id
            }
        >
            { children }
        </ProtectedRoute>
    )
}