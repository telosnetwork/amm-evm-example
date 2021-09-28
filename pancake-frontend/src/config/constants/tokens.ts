import { ChainId, Token } from '../../sdk'

export const CAKE: { [chainId: number]: Token } = {
  [ChainId.TESTNET]: new Token(
    ChainId.TESTNET,
    '0xd9151F839a9d8D280C0a3a694C82b6865BbCa099',
    18,
    'CAKE',
    'DemoSwap Token',
  ),
}

export const WTLOS = new Token(
  ChainId.TESTNET,
  '0xaE85Bf723A9e74d6c663dd226996AC1b8d075AA9',
  18,
  'WTLOS',
  'Wrapped TLOS',
)
export const LOL = new Token(ChainId.TESTNET, '0xdc96321d95BBC44721e49248989179a95A738B27', 4, 'LOL', 'LOL')
export const FIAT = new Token(ChainId.TESTNET, '0xD159C4E586421a507907faD705e067bfB350dc07', 4, 'FIAT', 'FIAT')
export const SOON = new Token(ChainId.TESTNET, '0xE9c31091868d68598Ac881738D159A63532d12f9', 9, 'SOON', 'SOON')

const tokens = {
  tlos: {
    symbol: 'TLOS',
    projectLink: 'https://www.telos.net/',
  },
  cake: {
    symbol: 'CAKE',
    address: {
      41: '0xd9151F839a9d8D280C0a3a694C82b6865BbCa099',
    },
    decimals: 18,
    projectLink: 'https://demo.telos.finance/',
  },
  wtlos: {
    symbol: 'wTLOS',
    address: {
      41: '0xaE85Bf723A9e74d6c663dd226996AC1b8d075AA9',
    },
    decimals: 18,
    projectLink: 'https://demo.telos.finance/',
  },
  syrup: {
    symbol: 'SYRUP',
    address: {
      41: '0xa6D7DE630eEdcc6f7699cDEB7A98bd759387db8e',
    },
    decimals: 18,
    projectLink: 'https://demo.telos.finance/',
  },
  lol: {
    symbol: 'LOL',
    address: {
      41: '0xdc96321d95BBC44721e49248989179a95A738B27',
    },
    decimals: 4,
    projectLink: 'https://demo.telos.finance/',
  },
  fiat: {
    symbol: 'FIAT',
    address: {
      41: '0xD159C4E586421a507907faD705e067bfB350dc07',
    },
    decimals: 4,
    projectLink: 'https://demo.telos.finance/',
  },
  soon: {
    symbol: 'SOON',
    address: {
      41: '0xE9c31091868d68598Ac881738D159A63532d12f9',
    },
    decimals: 9,
    projectLink: 'https://demo.telos.finance/',
  },
}

export default tokens
