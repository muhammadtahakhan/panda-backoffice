import React, { useEffect } from 'react'

import { saveUser } from '../../redux/userSlice'
import { useDispatch } from 'react-redux'

export default function AppData({ onDone }) {

    const dispatch = useDispatch()

    useEffect(() => {
        window.axios.get('/sanctum/csrf-cookie')
            .then(() => {
                window.axios.get('/api/user/me')
                    .then(response => {
                        if (response?.data?.data) {
                            dispatch(saveUser(response?.data?.data))
                            onDone()
                        } else {
                            dispatch(saveUser(null))
                            onDone()
                        }
                    }).catch(() => {
                        dispatch(saveUser(null))
                        onDone()
                    })
            })
    }, [])

    return null
}