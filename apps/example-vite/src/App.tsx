import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Page } from './components/base/base'
import { NavBar } from './components/NavBar'
import { GlobalStyle } from './global/GlobalStyle'
import { Balance } from './pages/Balance'
import { Prices } from './pages/Prices'
import { Block } from './pages/Block'
import { Tokens } from './pages/Tokens'
import { Transactions } from './pages/Transactions'
import { SendEtherPage } from './pages/SendEtherPage'
import { NotificationsList } from './components/Transactions/History'
import { Web3Modal } from './pages/Web3Modal'
import { Web3ReactConnector } from './pages/Web3ReactConnector'
import { Multichain } from './pages/Multichain'
import { ENSExample } from './components/ENS/ENSExample'
import { ConnectorPage } from './pages/ConnectorsPage'

export function App() {
  return (

    <Page>
      <GlobalStyle />
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route element={<Balance/>} index />
          <Route element={<SendEtherPage/>} path='/send' />
          <Route path="/transactions" element={<Transactions/>} />
          <Route path="/connectors" element={<ConnectorPage/>} />
        </Routes>
      </BrowserRouter>
      <NotificationsList />
    </Page>
  )
}
