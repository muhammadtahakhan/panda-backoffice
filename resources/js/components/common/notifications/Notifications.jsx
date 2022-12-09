import Button from '../forms/Button'
import Dropdown from '../menu/Dropdown'
import DropdownItem from '../menu/DropdownItem'
import NotificationPreview from '../notifications/NotificationPreview'
import React from 'react'
import SmallTitle from '../typography/SmallTitle'
import { useEffect } from 'react'
import useInterval from  '../../../hooks/UseInterval'
import { useState } from 'react'

export default function Notifications(){

    const [notifications, setNotifications] = useState([])
    const [showAll, setShowAll] = useState(false)
    const [initialLoad, setInitialLoad] = useState(true)

    useEffect(() => {
        getNotifications()
    }, [])

    useInterval(() => {
        getNotifications()
    }, 10000)

    useEffect(() => {
        getNotifications()
    }, [showAll])

    const getNotifications = () => {
        window.axios.get(`/api/notifications?all=${showAll ? 1 : 0}`)
            .then(response => {

                setNotifications(mergeNotifications(response?.data))

                // If there are no unread notifications, switch to showing all
                if(!response.data.find(notification => notification.read_at === null) && initialLoad) {
                    setShowAll(true)
                }

                if (initialLoad) {
                    setInitialLoad(false)
                }

            }).catch(error => console.error(error))
    }

    const mergeNotifications = (newNotifications) => {

        if (notifications.length === 0) {
            return newNotifications
        }
        
        return notifications.map(notification => {
            let newNotification = newNotifications.find(newNotification => newNotification.id === notification.id)

            if (newNotification) {
                return newNotification
            }

            return notification
        })
    }

    const markAsReadHandler = () => {
        window.axios.post('/api/notifications')
            .then(() => {
                getNotifications()
            }).catch(error => console.error(error))
    }

    return (
        <Dropdown
            variant="no-button"
            label={
                <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z" clipRule="evenodd" />
                    </svg>
                    { notifications?.filter(item => !item?.read_at).length > 0 && (
                        <div className="py-[.15rem] px-[.45rem] absolute top-0 -mt-3 text-[.25rem] -mr-3 right-0 rounded-full bg-red-500 text-white text-xs font-bold">
                            { notifications.length }
                        </div>
                    )}
                </div>
            }
            onOpen={ markAsReadHandler }
            header={(
                <>
                    <SmallTitle>Notifications</SmallTitle>
                    <div className="flex gap-2">
                        <Button
                            variant={ showAll ? 'outline' : 'light'}
                            size="sm"
                            onClick={ () => setShowAll(false) }
                        >Unread</Button>
                        <Button
                            variant={ showAll ? 'light' : 'outline'}
                            size="sm"
                            onClick={ () => setShowAll(true) }
                        >All</Button>
                    </div>
                </>
            )}
        >
            { notifications.length === 0 ? (
                <DropdownItem>
                    No notifications
                </DropdownItem>
            ) : (
                notifications?.filter(item => showAll ? item : item?.read_at === null)?.slice(0, 5)?.map(notification => (
                    <DropdownItem key={notification.id}>
                        <NotificationPreview notification={notification} />
                    </DropdownItem>
                ))
            )}
            
        </Dropdown>
    )
}