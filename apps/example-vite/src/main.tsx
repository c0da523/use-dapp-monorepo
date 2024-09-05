import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  Mainnet,
  DAppProvider,
  Config,
  Localhost,
  MetamaskConnector,
  CoinbaseWalletConnector,
  Optimism,
  Sepolia,
} from '@usedapp/core'
import {WalletConnectV2Connector} from '@usedapp/wallet-connect-v2-connector'
import { App } from './App'
import { getDefaultProvider } from '@ethersproject/providers'

const readOnlyUrls: Config['readOnlyUrls'] = {
  [Mainnet.chainId]: "https://cloudflare-eth.com",
  [Optimism.chainId]: 'https://mainnet.optimism.io',
  [Sepolia.chainId]: "https://rpc.sepolia.org" 
}


// const PORTIS_DAPP_ID = 'e36dbbe4-d25d-4db2-bfa8-cb80eb87d1f0'

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls,
  multicallVersion: 1 as const,
  fastMulticallEncoding: true,
  noMetamaskDeactivate: true,
  connectors: {
    metamask: new MetamaskConnector(),
    coinbase: new CoinbaseWalletConnector(),
    // portis: new PortisConnector(PORTIS_DAPP_ID, 'mainnet'),
    walletConnectV2: new WalletConnectV2Connector({
      projectId: 'bffbe493c0928ee125dc8f23e20167b7',
      chains: [Mainnet,Sepolia],
      rpcMap: {
        [Mainnet.chainId]: 'https://mainnet.infura.io/v3/d8df2cb7844e4a54ab0a782f608749dd',
        [Sepolia.chainId]: "https://rpc.sepolia.org" 
      },
    }),
  },
}

ReactDOM.createRoot(
  document.getElementById('root')!
).render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
)
