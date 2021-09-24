import React from 'react'
import { HeartFilled } from '@ant-design/icons'
import { Layout } from 'antd'

const { Footer: AntFooter } = Layout

const Footer = () => {
    return (
        <AntFooter className="footer-container">
            <span className="footer-text">
                Gumball ©2021 Made with <HeartFilled/>
            </span>
        </AntFooter>
    )
}

export default Footer