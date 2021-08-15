import { ChainId } from '../../sdk'

const NETWORK_URLS: { [chainId in ChainId]: string } = {
  [ChainId.TESTNET]: 'https://testnet.telos.net/evm',
}

export default NETWORK_URLS
