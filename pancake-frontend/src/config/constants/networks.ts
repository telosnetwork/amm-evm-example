import { ChainId } from '../../sdk'

const NETWORK_URLS: { [chainId in ChainId]: string } = {
  [ChainId.TESTNET]: 'http://testrpc.us.telos.net:7000/evm',
}

export default NETWORK_URLS
