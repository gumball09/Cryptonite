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
                key: item.id,
                name: item.name,
                icon: item.iconUrl,
                volume: item.volume,
                marketCap: item.marketCap,
                price: item.price,
                dailyChange: item.change,
                rank: item.rank
            }
        }))

        if(search !== '') {
            let filteredData = cryptosList?.data?.coins.filter(coin => coin.name.toLowerCase().includes(search))

            // Format data to be used in table
            setCryptos(prevState => filteredData.map(item => {
                return {
                    key: item.id,
                    name: <Link to={`/cryptos/${item.id}`}>{item.name}</Link>,
                    icon: item.iconUrl,
                    volume: item.volume,
                    marketCap: item.marketCap,
                    price: item.price,
                    dailyChange: item.change,
                    rank: item.rank
                }
            }))
        }
    }, [cryptosList, search])

    // Create columns for tables
    const columns = [
      {
        title: '',
        dataIndex: 'icon',
        key: 'icon',
        render: (icon) => <img src={icon} alt={icon} height={15} width={15} />,
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
          <b
            style={{
              color: '#52b2f2',
            }}
          >
            {name}
          </b>
        ),
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
        <Table dataSource={cryptos} columns={columns} size="small"/>
      </>
    )
}

export default Cryptocurrencies