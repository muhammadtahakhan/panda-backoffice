import DefaultContainer from '../components/common/layout/DefaultContainer'
import PageTitle from '../components/common/typography/PageTitle'
import React from 'react'
import SiteTitle from '../components/global/SiteTitle'
import Text from '../components/common/typography/Text'
import { Link } from 'react-router-dom'
import Card from '../components/common/widgets/Card'

export default function About() {

    return (
        <div>


            <SiteTitle>Dashboard</SiteTitle>
            <PageTitle>Dashboard</PageTitle>

            <div className="w-full px-4 py-2 bg-gray-200 lg:w-full">
                <div className="container mx-auto mt-12">
                    <div className="grid gap-4 lg:grid-cols-4">

                        <Card count="100" title="Total Items" icon="" />
                        <Card count="500" title="Sales" icon=""/>
                        <Card count="200" title="Collection" icon=""/>
                        <Card count="1900" title="Allusers" icon=""/>



                    </div>
                </div>
            </div>


            <Link to="sales" >Sales</Link>
            <Text>Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam quis risus eget urna mollis ornare vel eu leo.</Text>
            </div>
    )
}
