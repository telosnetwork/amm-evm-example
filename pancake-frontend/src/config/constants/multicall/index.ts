import { ChainId } from '../../../sdk'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.TESTNET]: '0xB3b638cb5d651d21DD6433aE37F23cd1d79B0b16',
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
