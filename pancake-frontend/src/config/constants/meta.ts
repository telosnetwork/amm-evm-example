import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'Telos EVM Demo Swap',
  description:
    'The most popular AMM on Telos by user count! Earn CAKE through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by Telos EVM Demo Swap), NFTs, and more, on a platform you can trust.',
  image: 'https://pancakeswap.finance/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  switch (path) {
    case '/':
      return {
        title: `${t('Home')} | ${t('Telos EVM Demo Swap')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('Telos EVM Demo Swap')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('Telos EVM Demo Swap')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('Telos EVM Demo Swap')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('Telos EVM Demo Swap')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('Telos EVM Demo Swap')}`,
      }
    case '/collectibles':
      return {
        title: `${t('Collectibles')} | ${t('Telos EVM Demo Swap')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('Telos EVM Demo Swap')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('Telos EVM Demo Swap')}`,
      }
    case '/profile/tasks':
      return {
        title: `${t('Task Center')} | ${t('Telos EVM Demo Swap')}`,
      }
    case '/profile':
      return {
        title: `${t('Your Profile')} | ${t('Telos EVM Demo Swap')}`,
      }
    default:
      return null
  }
}
