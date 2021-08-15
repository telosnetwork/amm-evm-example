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
      41: '0xcde2485559cbfa7BE73a1d2ab21D0aec798Be9b2',
    },
    token: tokens.syrup,
    quoteToken: tokens.wtlos,
  },
  {
    pid: 1,
    lpSymbol: 'CAKE-TLOS LP',
    lpAddresses: {
      41: '0xd6f5badD05dbE5fAF041D7554223016bF11f1829',
    },
    token: tokens.cake,
    quoteToken: tokens.wtlos,
  },
  {
    pid: 2,
    lpSymbol: 'FIAT-SOON LP',
    lpAddresses: {
      41: '0x519C6192A2F9cE24F39D3F9370a92230c0DbA274',
    },
    token: tokens.fiat,
    quoteToken: tokens.soon,
  },
  {
    pid: 3,
    lpSymbol: 'SOON-CAKE LP',
    lpAddresses: {
      41: '0xb3D6AD39651dDde81873521b19711f2C6dE17037',
    },
    token: tokens.soon,
    quoteToken: tokens.cake,
  },
  {
    pid: 4,
    lpSymbol: 'SOON-TLOS LP',
    lpAddresses: {
      41: '0x7eaCc1d8173a87C8FD5a95f34982BF63278932c0',
    },
    token: tokens.soon,
    quoteToken: tokens.wtlos,
  },
   {
    pid: 5,
    lpSymbol: 'FIAT-TLOS LP',
    lpAddresses: {
      41: '0xeCEc99E42b2C22F4f4a8e1468a73dD618fC3173d',
    },
    token: tokens.fiat,
    quoteToken: tokens.wtlos,
  }
]

export default farms
