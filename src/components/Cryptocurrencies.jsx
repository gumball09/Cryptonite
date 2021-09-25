import React, { useState, useEffect } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Typography, Table, Input } from 'antd'

import { useGetCryptosQuery } from '../services/cryptoApi'
import { Loading } from '../components'

const { Title } = Typography

const Cryptocurrencies = ({ simplified }) => {
    const [cryptos, setCryptos] = useState([])
    const [search, setSearch] = useState('')

    // set the limit for number of coins to be fetched 
    const limit = simplified ? 10 : 100
    const { data: cryptosList, isFetching } = useGetCryptosQuery(limit)

    // runs when 'search' or 'cryptoList' changes to update 'cryptos'
    useEffect(() => {
        // Format data to be used in table
        setCryptos(prevState => cryptosList?.data?.coins.map(item => {
            return {
                icon: item.iconUrl,
                name: item.name,
                volume: item.volume,
                marketCap: item.marketCap,
                price: item.price,
                dailyChange: item.change,
                rank: item.rank,
                details: item.id
            }
        }))

        if(search !== '') {
            let filteredData = cryptosList?.data?.coins.filter(coin => coin.name.toLowerCase().includes(search))

            // Format data to be used in table
            setCryptos(prevState => filteredData.map(item => {
                return {
                    icon: item.iconUrl,
                    name: item.name, 
                    volume: item.volume,
                    marketCap: item.marketCap,
                    price: item.price,
                    dailyChange: item.change,
                    rank: item.rank,
                    details: item.id
                }
            }))
        }
    }, [cryptosList, search])

    console.log(cryptos)
    // Create columns for tables
    const columns = [
      {
        title: '',
        dataIndex: 'icon',
        key: 'icon',
        render: (icon) => <img src={icon} alt={icon} height={15} width={15} />
      },
      {
        title: 'Rank',
        dataIndex: 'rank',
        key: 'rank',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (name) => (
          <b style={{ color: '#0071bd' }}>{name}</b>
        )
      },
      {
        title: 'Price (USD)',
        dataIndex: 'price',
        key: 'price',
        render: (price) => '$' + (Number(price).toFixed(5)).toString()
      },
      {
        title: 'Market Cap',
        dataIndex: 'marketCap',
        key: 'marketCap',
        render: (marketCap) => millify(marketCap),
      },
      {
        title: 'Daily Change',
        dataIndex: 'dailyChange',
        key: 'dailyChange',
        render: (dailyChange) => millify(dailyChange).toString() + '%',
      },
      {
        title: 'Details',
        dataIndex: 'details',
        key: 'details',
        render: (details) => <Link to={`/cryptos/${details}`}>More details</Link>
      }
    ];
    
    if(isFetching) {
        return <Loading/>
    }

    return (
      <>
        <Title level={4}>Cryptocurrencies</Title>
        <p style={{ fontSize: '12px' }}>Top {limit} cryptocurrencies</p>
        {!simplified && (
          <div className='search-crypto'>
            <Input
              placeholder='Search Cryptocurrency'
              onChange={(e) => setSearch(e.target.value.trim().toLowerCase())}
            />
          </div>
        )}
        <div style={{ overflow: 'hidden' }}>
          <Table style={{ 'overflow-y': 'auto' }}dataSource={cryptos} columns={columns} size="small"/>
        </div>
      </>
    )
}

export default Cryptocurrencies