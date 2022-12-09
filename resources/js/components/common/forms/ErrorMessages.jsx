import React from 'react'
import Text from '../typography/Text'

export default function ErrorMessages({ errors }) {
    return (
        <div className="mt-2">
            <Text variant="error" size="sm">{ errors?.join(' ') }</Text>
        </div>
    )
}