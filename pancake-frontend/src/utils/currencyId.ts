import { Currency, ETHER, Token } from '../sdk'

export function currencyId(currency: Currency): string {
  if (currency === ETHER) return 'TLOS'
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}

export default currencyId
