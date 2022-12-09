import React from 'react'
import Text from '../typography/Text'

export default function StatRow({ stat }) {

    return (
        <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 font-bold">
                <Text>{ stat?.label }</Text>
            </div>
            <div className="flex-1">
                <Text>{ stat?.value }</Text>
            </div>
        </div>
    )
}