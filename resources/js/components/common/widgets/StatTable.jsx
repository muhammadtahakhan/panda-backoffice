import React from 'react'
import StatRow from './StatRow'

export default function StatTable({ stats, before, after }) {

    return (
        <div className="bg-white rounded-lg p-4">
            { before }
            { stats?.map(stat => (
                <StatRow key={ stat.label } stat={ stat } />
            ))}
            { after }
        </div>
    )
}