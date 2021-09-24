import { Layout } from 'antd'
import { Navbar, Footer, Homepage, Cryptocurrencies, Chart, News } from './components'

import { Switch, Route } from 'react-router-dom'
import './App.css'

const { Content } = Layout

const App = () => {
    return (
        <div className="app-container">
            <Layout className="app">
                <Navbar/>
                <Layout className='main'>
                    {/* <Header/> */}
                    <Content className="main-content">
                        <div
                        className='main'
                        style={{ padding: 24, minHeight: 480 }}
                        >
                            {/* Always define "/" last */}
                            <Switch>
                                <Route path="/cryptocurrencies">
                                    <Cryptocurrencies/>
                                </Route>
                                <Route path="/charts">
                                    <Chart/>
                                </Route>
                                <Route path="/news">
                                    <News/>
                                </Route>
                                <Route path="/">
                                    <Homepage/>
                                </Route>
                            </Switch>
                        </div>
                    </Content>
                <Footer/>
                </Layout>
            </Layout>
        </div>
    )
}

export default App