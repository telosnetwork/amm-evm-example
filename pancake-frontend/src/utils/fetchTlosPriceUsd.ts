export async function fetchTlosPriceUsd(): Promise<any> {
  const response = await fetch(
    'https://api.coingecko.com/api/v3/coins/telos?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false',
  )
  const body = await response.json()
  return body.market_data.current_price.usd
}
