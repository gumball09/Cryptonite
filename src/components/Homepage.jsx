import React from 'react'
import millify from 'millify'
import { Typography, Row, Col, Statistic } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import { useGetGlobalStatsQuery } from '../services/cryptoApi'
import { Cryptocurrencies, Loading } from '../components'

const { Title } = Typography

const Homepage = () => {
    const { data, isFetching } = useGetGlobalStatsQuery()

    if(isFetching) {
        return <Loading/> 
    }

    const globalStats = data?.data
    return (
        <>
            <div class='home-heading-container'>
                <Title level={4} className='heading'>
                Global Crypto Stats&nbsp;<LoadingOutlined/>
                </Title>
                <Row gutter={[32, 12]}>
                    <Col span={12}>
                        <Statistic
                            valueStyle={{ fontSize: '12px'}}
                            title='Total Coins'
                            value={globalStats.totalCoins}
                        />
                    </Col>
                    <Col span={12}>
                        <Statistic
                            valueStyle={{ fontSize: '12px'}}
                            title='Total Exchanges'
                            value={millify(globalStats.totalExchanges)}
                        />
                    </Col>
                    <Col span={12}>
                        <Statistic
                            valueStyle={{ fontSize: '12px'}}
                            title='Total Market Cap'
                            value={millify(globalStats.totalMarketCap)}
                        />
                    </Col>
                    <Col span={12}>
                        <Statistic
                            valueStyle={{ fontSize: '12px'}}
                            title='Total 24h Volume'
                            value={millify(globalStats.total24hVolume)}
                        />
                    </Col>
                    <Col span={12}>
                        <Statistic
                            valueStyle={{ fontSize: '12px'}}
                            title='Total Markets'
                            value={millify(globalStats.totalMarkets)}
                        />
                    </Col>
                </Row>
            </div>
            <div class="home-heading-container">
                <Cryptocurrencies simplified/>
            </div>
        </>
    )
}

export default Homepage 
