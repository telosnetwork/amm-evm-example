import tokens from './tokens'
import { PoolConfig, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    stakingToken: tokens.cake,
    earningToken: tokens.cake,
    contractAddress: {
      41: '0x2b51932DbA50446F66427BE4c4B77768Fc3B903E',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '10',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 1,
    stakingToken: tokens.tlos,
    earningToken: tokens.cake,
    contractAddress: {
      41: '0x0000000000000000000000000000000000000018', // TODO: Replace temp address with a normal one.
    },
    poolCategory: PoolCategory.TELOS,
    harvest: true,
    tokenPerBlock: '0.5',
    sortOrder: 999,
    isFinished: false,
  },
  {
    sousId: 2,
    stakingToken: tokens.cake,
    earningToken: tokens.tlos,
    contractAddress: {
      41: '0x0000000000000000000000000000000000000019', // TODO: Replace temp address with a normal one.
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.0041',
    sortOrder: 999,
    isFinished: false,
  },
]

export default pools
