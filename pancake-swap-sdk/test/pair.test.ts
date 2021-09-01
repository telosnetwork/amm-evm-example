import { ChainId, Token, Pair, TokenAmount, WETH, Price } from '../src'

describe('Pair', () => {
  const SOON = new Token(ChainId.TESTNET, '0xE9c31091868d68598Ac881738D159A63532d12f9', 9, 'SOON', 'SOON')
  const FIAT = new Token(ChainId.TESTNET, '0xD159C4E586421a507907faD705e067bfB350dc07', 4, 'FIAT', 'FIAT')

  describe('#getAddress', () => {
    it('returns the correct address', () => {
      expect(Pair.getAddress(FIAT, SOON)).toEqual('0xcb14Ec1CA3efF4b7C3d0d82cb49eb244a8f4774C')
    })
  })

  describe('#token0', () => {
    it('always is the token that sorts before', () => {
      expect(new Pair(new TokenAmount(SOON, '100'), new TokenAmount(FIAT, '100')).token0).toEqual(FIAT)
      expect(new Pair(new TokenAmount(FIAT, '100'), new TokenAmount(SOON, '100')).token0).toEqual(FIAT)
    })
  })
  describe('#token1', () => {
    it('always is the token that sorts after', () => {
      expect(new Pair(new TokenAmount(SOON, '100'), new TokenAmount(FIAT, '100')).token1).toEqual(SOON)
      expect(new Pair(new TokenAmount(FIAT, '100'), new TokenAmount(SOON, '100')).token1).toEqual(SOON)
    })
  })
  describe('#reserve0', () => {
    it('always comes from the token that sorts before', () => {
      expect(new Pair(new TokenAmount(SOON, '100'), new TokenAmount(FIAT, '101')).reserve0).toEqual(
        new TokenAmount(FIAT, '101')
      )
      expect(new Pair(new TokenAmount(FIAT, '101'), new TokenAmount(SOON, '100')).reserve0).toEqual(
        new TokenAmount(FIAT, '101')
      )
    })
  })
  describe('#reserve1', () => {
    it('always comes from the token that sorts after', () => {
      expect(new Pair(new TokenAmount(SOON, '100'), new TokenAmount(FIAT, '101')).reserve1).toEqual(
        new TokenAmount(SOON, '100')
      )
      expect(new Pair(new TokenAmount(FIAT, '101'), new TokenAmount(SOON, '100')).reserve1).toEqual(
        new TokenAmount(SOON, '100')
      )
    })
  })

  describe('#token0Price', () => {
    it('returns price of token0 in terms of token1', () => {
      expect(new Pair(new TokenAmount(SOON, '101'), new TokenAmount(FIAT, '100')).token0Price).toEqual(
        new Price(FIAT, SOON, '100', '101')
      )
      expect(new Pair(new TokenAmount(FIAT, '100'), new TokenAmount(SOON, '101')).token0Price).toEqual(
        new Price(FIAT, SOON, '100', '101')
      )
    })
  })

  describe('#token1Price', () => {
    it('returns price of token1 in terms of token0', () => {
      expect(new Pair(new TokenAmount(SOON, '101'), new TokenAmount(FIAT, '100')).token1Price).toEqual(
        new Price(SOON, FIAT, '101', '100')
      )
      expect(new Pair(new TokenAmount(FIAT, '100'), new TokenAmount(SOON, '101')).token1Price).toEqual(
        new Price(SOON, FIAT, '101', '100')
      )
    })
  })

  describe('#priceOf', () => {
    const pair = new Pair(new TokenAmount(SOON, '101'), new TokenAmount(FIAT, '100'))
    it('returns price of token in terms of other token', () => {
      expect(pair.priceOf(FIAT)).toEqual(pair.token0Price)
      expect(pair.priceOf(SOON)).toEqual(pair.token1Price)
    })

    it('throws if invalid token', () => {
      expect(() => pair.priceOf(WETH[ChainId.TESTNET])).toThrow('TOKEN')
    })
  })

  describe('#reserveOf', () => {
    it('returns reserves of the given token', () => {
      expect(new Pair(new TokenAmount(SOON, '100'), new TokenAmount(FIAT, '101')).reserveOf(SOON)).toEqual(
        new TokenAmount(SOON, '100')
      )
      expect(new Pair(new TokenAmount(FIAT, '101'), new TokenAmount(SOON, '100')).reserveOf(SOON)).toEqual(
        new TokenAmount(SOON, '100')
      )
    })

    it('throws if not in the pair', () => {
      expect(() =>
        new Pair(new TokenAmount(FIAT, '101'), new TokenAmount(SOON, '100')).reserveOf(WETH[ChainId.TESTNET])
      ).toThrow('TOKEN')
    })
  })

  describe('#chainId', () => {
    it('returns the token0 chainId', () => {
      expect(new Pair(new TokenAmount(SOON, '100'), new TokenAmount(FIAT, '100')).chainId).toEqual(ChainId.TESTNET)
      expect(new Pair(new TokenAmount(FIAT, '100'), new TokenAmount(SOON, '100')).chainId).toEqual(ChainId.TESTNET)
    })
  })
  describe('#involvesToken', () => {
    expect(new Pair(new TokenAmount(SOON, '100'), new TokenAmount(FIAT, '100')).involvesToken(SOON)).toEqual(true)
    expect(new Pair(new TokenAmount(SOON, '100'), new TokenAmount(FIAT, '100')).involvesToken(FIAT)).toEqual(true)
    expect(
      new Pair(new TokenAmount(SOON, '100'), new TokenAmount(FIAT, '100')).involvesToken(WETH[ChainId.TESTNET])
    ).toEqual(false)
  })
})
