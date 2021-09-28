import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { ConnectorNames } from 'pancakeswap-uikit'
import { ethers } from 'ethers'
import QRCodeModal from '@walletconnect/qrcode-modal'
import getNodeUrl from './getRpcUrl'
import { anchor } from './eosioWallet'

const POLLING_INTERVAL = 2000
const rpcUrl = getNodeUrl()
const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10)

const injected = new InjectedConnector({ supportedChainIds: [chainId] })

const walletconnect = new WalletConnectConnector({
  rpc: { [chainId]: rpcUrl },
  chainId,
  qrcode: true,
  qrcodeModal: QRCodeModal,
  pollingInterval: POLLING_INTERVAL,
})

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.Anchor]: anchor,
}

export const getLibrary = (provider): ethers.providers.Web3Provider => {
  const library = new ethers.providers.Web3Provider(provider)
  library.pollingInterval = POLLING_INTERVAL
  return library
}

export const signMessage = async (provider: any, account: string, message: string): Promise<string> => {
  /**
   * Wallet Connect does not sign the message correctly unless you use their method
   * @see https://github.com/WalletConnect/walletconnect-monorepo/issues/462
   */
  if (provider.provider?.wc) {
    const wcMessage = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(message))
    const signature = await provider.provider?.wc.signPersonalMessage([wcMessage, account])
    return signature
  }

  return provider.getSigner(account).signMessage(message)
}
