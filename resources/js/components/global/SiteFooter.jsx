import { Link } from 'react-router-dom'
import React from 'react'
import Text from '../common/typography/Text'

export default function SiteFooter() {

    return (
        <footer className="border-t border-stone-200">
            <div className="container mx-auto py-8">
                <Text className="font-bold" centered size="sm">A project of <Link to="/" className="underline">Figoli Quinn & Associates</Link>, a design and development agency based in Oregon, USA.</Text>
            </div>
        </footer>
    )
}