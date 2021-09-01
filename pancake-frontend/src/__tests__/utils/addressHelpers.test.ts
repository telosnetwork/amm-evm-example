import { getAddress } from 'utils/addressHelpers'

describe('getAddress', () => {
  const address = {
    41: '0xd9151F839a9d8D280C0a3a694C82b6865BbCa099',
  }

  it(`get address for testnet (chainId 41)`, () => {
    process.env.REACT_APP_CHAIN_ID = '41'
    const expected = address[41]
    expect(getAddress(address)).toEqual(expected)
  })
  it(`get address for any other network (chainId 31337)`, () => {
    process.env.REACT_APP_CHAIN_ID = '31337'
    const expected = address[41]
    expect(getAddress(address)).toEqual(expected)
  })
})
