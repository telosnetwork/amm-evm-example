import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  /**
   * These 2 farms (PID 0, 1) should always be at the top of the file.
   */
  {
    pid: 0,
    lpSymbol: 'CAKE',
    lpAddresses: {
      41: '0xd9151F839a9d8D280C0a3a694C82b6865BbCa099',
    },
    token: tokens.syrup,
    quoteToken: tokens.wtlos,
  },
  {
    pid: 1,
    lpSymbol: 'CAKE-TLOS LP',
    lpAddresses: {
      41: '0x50074Ecf688A57b24b6728b6BE26eAEd2C302927',
    },
    token: tokens.cake,
    quoteToken: tokens.wtlos,
  },
  {
    pid: 2,
    lpSymbol: 'FIAT-SOON LP',
    lpAddresses: {
      41: '0xcb14Ec1CA3efF4b7C3d0d82cb49eb244a8f4774C',
    },
    token: tokens.fiat,
    quoteToken: tokens.soon,
  },
  {
    pid: 3,
    lpSymbol: 'SOON-CAKE LP',
    lpAddresses: {
      41: '0xfd6BA489C20e48B94971eD75dC89320fFa46b5Dc',
    },
    token: tokens.soon,
    quoteToken: tokens.cake,
  },
  {
    pid: 4,
    lpSymbol: 'SOON-TLOS LP',
    lpAddresses: {
      41: '0x03d48d2e9cdc66aa97eD927e2f2160aeAb71cF22',
    },
    token: tokens.soon,
    quoteToken: tokens.wtlos,
  },
  {
    pid: 5,
    lpSymbol: 'FIAT-TLOS LP',
    lpAddresses: {
      41: '0xE4C12A310353975603Bb13e366fBDdE034697A66',
    },
    token: tokens.fiat,
    quoteToken: tokens.wtlos,
  },
]

export default farms
