import { ChainId } from '../../../sdk'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.TESTNET]: '0xd1a3D387B37e8DFd019debd6729289335ADde41C',
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
