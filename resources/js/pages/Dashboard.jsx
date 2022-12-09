import DefaultContainer from '../components/common/layout/DefaultContainer'
import PageTitle from '../components/common/typography/PageTitle'
import React from 'react'
import SiteTitle from '../components/global/SiteTitle'
import Text from '../components/common/typography/Text'

export default function About() {

    return (
        <DefaultContainer>
            <SiteTitle>Dashboard</SiteTitle>

            <PageTitle>Dashboard</PageTitle>
            <Text>Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam quis risus eget urna mollis ornare vel eu leo.</Text>
        </DefaultContainer>
    )
}