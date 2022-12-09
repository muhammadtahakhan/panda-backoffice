import { Link } from 'react-router-dom'
import React from 'react'
import Text from '../typography/Text'

export default function NotificationPreview({ notification }) {

    return (
        <div className="border-b border-stone-200 pb-2">
            { notification.type === 'App\\Notifications\\RenderJobCompleteNotification' && (
                <Link to="/render-jobs">
                    <p className="text-xs uppercase text-stone-600">Render Complete</p>
                    <Text size="xs">Your render <strong>{ notification?.data?.name }</strong> is complete!</Text>
                </Link>        
            )}
        </div>
    )
}