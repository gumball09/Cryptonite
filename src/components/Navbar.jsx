import { useState } from 'react'
import { Layout, Menu, Avatar, Typography } from 'antd'
import { HomeOutlined, MoneyCollectOutlined, LineChartOutlined, FileTextOutlined } from '@ant-design/icons'
import logo from '../images/cryptocurrency.png'

import { Link } from 'react-router-dom'

const { Sider } = Layout

const Navbar = () => {
    const [collapse, setCollapse] = useState(false)

    const toggleCollapse = () => {
        setCollapse(prevState => collapse ? false : true)
    }

    return (
        <Sider className="navbar-container" collapsible collapsed={collapse} onCollapse={toggleCollapse}>
          <div className='logo'>
              <Avatar src={logo} size="medium"/>
              <Typography.Title 
                className="logo-title" 
                level={5}
                style={{ display: collapse ? 'none' : ''}}
              >Cryptonite
              </Typography.Title>
          </div>
          <Menu className="navbar-content" theme='dark' defaultSelectedKeys={['1']} mode='inline'>
            <Menu.Item icon={<HomeOutlined />}>
                <Link to="/">Homepage</Link>
            </Menu.Item>
            <Menu.Item icon={<MoneyCollectOutlined/>}>
                <Link to="/cryptocurrencies">Cryptocurrencies</Link>
            </Menu.Item>
            <Menu.Item icon={<LineChartOutlined />}>
                <Link to="/charts">Charts</Link>
            </Menu.Item>
            <Menu.Item icon={<FileTextOutlined />}>
                <Link to="/news">News</Link>
            </Menu.Item>
          </Menu>
        </Sider>
    )
}

export default Navbar