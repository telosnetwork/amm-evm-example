import tokens from './tokens'
import farms from './farms'
import { Ifo, Token } from './types'

const cakeTlosLpToken: Token = {
  symbol: farms[1].lpSymbol,
  address: farms[1].lpAddresses,
  decimals: 18,
}

const ifos: Ifo[] = []

export default ifos
