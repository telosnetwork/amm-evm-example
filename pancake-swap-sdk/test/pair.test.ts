import { ChainId, Token, Pair, TokenAmount, WETH, Price } from '../src'

describe('Pair', () => {
  const BENCH = new Token(ChainId.TESTNET, '0xAFe48Cba47D3ffB3e988b7F329388495Cf2Fbcc8', 18, 'BENCH', 'BENCH')
  const WTLOS = new Token(ChainId.TESTNET, '0x5bf0E1Fa3B7988660E8d22860743BB289196f0ac', 18, 'WTLOS', 'WTLOS')

  describe('#getAddress', () => {
    it('returns the correct address', () => {
      expect(Pair.getAddress(WTLOS, BENCH)).toEqual('0xfB7b8DC300661dD6b787cde08AF9CF4b1Db825B7')
    })
  })

  describe('#token0', () => {
    it('always is the token that sorts before', () => {
      expect(new Pair(new TokenAmount(BENCH, '100'), new TokenAmount(WTLOS, '100')).token0).toEqual(WTLOS)
      expect(new Pair(new TokenAmount(WTLOS, '100'), new TokenAmount(BENCH, '100')).token0).toEqual(WTLOS)
    })
  })
  describe('#token1', () => {
    it('always is the token that sorts after', () => {
      expect(new Pair(new TokenAmount(BENCH, '100'), new TokenAmount(WTLOS, '100')).token1).toEqual(BENCH)
      expect(new Pair(new TokenAmount(WTLOS, '100'), new TokenAmount(BENCH, '100')).token1).toEqual(BENCH)
    })
  })
  describe('#reserve0', () => {
    it('always comes from the token that sorts before', () => {
      expect(new Pair(new TokenAmount(BENCH, '100'), new TokenAmount(WTLOS, '101')).reserve0).toEqual(
        new TokenAmount(WTLOS, '101')
      )
      expect(new Pair(new TokenAmount(WTLOS, '101'), new TokenAmount(BENCH, '100')).reserve0).toEqual(
        new TokenAmount(WTLOS, '101')
      )
    })
  })
  describe('#reserve1', () => {
    it('always comes from the token that sorts after', () => {
      expect(new Pair(new TokenAmount(BENCH, '100'), new TokenAmount(WTLOS, '101')).reserve1).toEqual(
        new TokenAmount(BENCH, '100')
      )
      expect(new Pair(new TokenAmount(WTLOS, '101'), new TokenAmount(BENCH, '100')).reserve1).toEqual(
        new TokenAmount(BENCH, '100')
      )
    })
  })

  describe('#token0Price', () => {
    it('returns price of token0 in terms of token1', () => {
      expect(new Pair(new TokenAmount(BENCH, '101'), new TokenAmount(WTLOS, '100')).token0Price).toEqual(
        new Price(WTLOS, BENCH, '100', '101')
      )
      expect(new Pair(new TokenAmount(WTLOS, '100'), new TokenAmount(BENCH, '101')).token0Price).toEqual(
        new Price(WTLOS, BENCH, '100', '101')
      )
    })
  })

  describe('#token1Price', () => {
    it('returns price of token1 in terms of token0', () => {
      expect(new Pair(new TokenAmount(BENCH, '101'), new TokenAmount(WTLOS, '100')).token1Price).toEqual(
        new Price(BENCH, WTLOS, '101', '100')
      )
      expect(new Pair(new TokenAmount(WTLOS, '100'), new TokenAmount(BENCH, '101')).token1Price).toEqual(
        new Price(BENCH, WTLOS, '101', '100')
      )
    })
  })

  describe('#priceOf', () => {
    const pair = new Pair(new TokenAmount(BENCH, '101'), new TokenAmount(WTLOS, '100'))
    it('returns price of token in terms of other token', () => {
      expect(pair.priceOf(WTLOS)).toEqual(pair.token0Price)
      expect(pair.priceOf(BENCH)).toEqual(pair.token1Price)
    })

    it('throws if invalid token', () => {
      expect(() => pair.priceOf(WETH[ChainId.TESTNET])).toThrow('TOKEN')
    })
  })

  describe('#reserveOf', () => {
    it('returns reserves of the given token', () => {
      expect(new Pair(new TokenAmount(BENCH, '100'), new TokenAmount(WTLOS, '101')).reserveOf(BENCH)).toEqual(
        new TokenAmount(BENCH, '100')
      )
      expect(new Pair(new TokenAmount(WTLOS, '101'), new TokenAmount(BENCH, '100')).reserveOf(BENCH)).toEqual(
        new TokenAmount(BENCH, '100')
      )
    })

    it('throws if not in the pair', () => {
      expect(() =>
        new Pair(new TokenAmount(WTLOS, '101'), new TokenAmount(BENCH, '100')).reserveOf(WETH[ChainId.TESTNET])
      ).toThrow('TOKEN')
    })
  })

  describe('#chainId', () => {
    it('returns the token0 chainId', () => {
      expect(new Pair(new TokenAmount(BENCH, '100'), new TokenAmount(WTLOS, '100')).chainId).toEqual(ChainId.TESTNET)
      expect(new Pair(new TokenAmount(WTLOS, '100'), new TokenAmount(BENCH, '100')).chainId).toEqual(ChainId.TESTNET)
    })
  })
  describe('#involvesToken', () => {
    expect(new Pair(new TokenAmount(BENCH, '100'), new TokenAmount(WTLOS, '100')).involvesToken(BENCH)).toEqual(true)
    expect(new Pair(new TokenAmount(BENCH, '100'), new TokenAmount(WTLOS, '100')).involvesToken(WTLOS)).toEqual(true)
    expect(
      new Pair(new TokenAmount(BENCH, '100'), new TokenAmount(WTLOS, '100')).involvesToken(WETH[ChainId.TESTNET])
    ).toEqual(false)
  })
})
