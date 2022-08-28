import { ChainId, Token } from '../../sdk'

export const CAKE: { [chainId: number]: Token } = {
  [ChainId.TESTNET]: new Token(
    ChainId.TESTNET,
    '0xFae070Aa73A33a236487A5275C74CFeA1C80529d',
    18,
    'CAKE',
    'DemoSwap Token',
  ),
}

export const WTLOS = new Token(
  ChainId.TESTNET,
  '0x5bf0E1Fa3B7988660E8d22860743BB289196f0ac',
  18,
  'WTLOS',
  'Wrapped TLOS',
)
export const LOL = new Token(ChainId.TESTNET, '0xFEA334eF431f683Ce6921713b293416d0677aFF4', 18, 'LOL', 'LOL')
export const FIAT = new Token(ChainId.TESTNET, '0xf67199482FabD2E6A961d0b370560D2624b7F80F', 18, 'FIAT', 'FIAT')
export const SOON = new Token(ChainId.TESTNET, '0x3E50798E86D1046Eb9d1c7fe86566128e25e5631', 18, 'SOON', 'SOON')

const tokens = {
  tlos: {
    symbol: 'TLOS',
    projectLink: 'https://www.telos.net/',
  },
  cake: {
    symbol: 'CAKE',
    address: {
      41: '0xFae070Aa73A33a236487A5275C74CFeA1C80529d',
    },
    decimals: 18,
    projectLink: 'https://demo.telos.finance/',
  },
  wtlos: {
    symbol: 'wTLOS',
    address: {
      41: '0x5bf0E1Fa3B7988660E8d22860743BB289196f0ac',
    },
    decimals: 18,
    projectLink: 'https://demo.telos.finance/',
  },
  syrup: {
    symbol: 'SYRUP',
    address: {
      41: '0xC95c6c778Cb9f709f91b2F515365D88435Bbb2d8',
    },
    decimals: 18,
    projectLink: 'https://demo.telos.finance/',
  },
  lol: {
    symbol: 'LOL',
    address: {
      41: '0xFEA334eF431f683Ce6921713b293416d0677aFF4',
    },
    decimals: 18,
    projectLink: 'https://demo.telos.finance/',
  },
  fiat: {
    symbol: 'FIAT',
    address: {
      41: '0xf67199482FabD2E6A961d0b370560D2624b7F80F',
    },
    decimals: 18,
    projectLink: 'https://demo.telos.finance/',
  },
  soon: {
    symbol: 'SOON',
    address: {
      41: '0x3E50798E86D1046Eb9d1c7fe86566128e25e5631',
    },
    decimals: 18,
    projectLink: 'https://demo.telos.finance/',
  },
  bench: {
    symbol: 'BENCH',
    address: {
      41: '0xAFe48Cba47D3ffB3e988b7F329388495Cf2Fbcc8',
    },
    decimals: 18,
    projectLink: 'https://demo.telos.finance/',
  },
}

export default tokens
