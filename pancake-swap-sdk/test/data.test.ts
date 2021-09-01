import { ChainId, WETH, Token, Fetcher } from '../src'

// TODO: replace the provider in these tests
describe.skip('data', () => {
  it('Token', async () => {
    const token = await Fetcher.fetchTokenData(ChainId.TESTNET, '0xE9c31091868d68598Ac881738D159A63532d12f9') // SOON
    expect(token.decimals).toEqual(9)
  })

  it('Pair', async () => {
    const token = new Token(ChainId.TESTNET, '0xE9c31091868d68598Ac881738D159A63532d12f9', 9) // SOON
    const pair = await Fetcher.fetchPairData(WETH[ChainId.TESTNET], token)
    expect(pair.liquidityToken.address).toEqual('0x03d48d2e9cdc66aa97eD927e2f2160aeAb71cF22')
  })
})
