import { SalesSectionProps } from '.'

export const swapSectionData: SalesSectionProps = {
  headingText: 'DeFi at speeds you have never seen before',
  // headingText: 'Trade anything. No registration, no hassle.',
  bodyText: 'Blazing Fast Trades on TelosEVM',
  // bodyText: 'Trade any token on Telos in seconds, just by connecting your wallet.',
  reverse: false,
  primaryButton: {
    to: '/swap',
    text: 'Test DemoSwap now',
    external: false,
  },
  secondaryButton: {
    to: 'https://api.telos.net/v1/testnet/evmFaucet/',
    text: 'Get Testnet EVM TLOS',
    external: false,
  },
  images: {
    path: '/images/home/trade/',
    attributes: [
      // { src: 'TLOS', alt: 'TLOS token' },
      { src: 'BTC_', alt: 'BTC image' },
      // { src: 'BTC', alt: 'BTC token' },
      // { src: 'CAKE', alt: 'CAKE token' },
    ],
  },
}

export const earnSectionData: SalesSectionProps = {
  headingText: 'Near Zero Gas Fees',
  // headingText: 'Earn passive income with crypto.',
  bodyText: 'DeFi for the masses is here',
  // bodyText: 'Telos EVM Demo Swap makes it easy to make your crypto work for you.',
  reverse: true,
  primaryButton: {
    to: 'https://app.telos.net/testnet/developers',
    text: 'Get Testnet EVM TLOS',
    external: true,
  },
  secondaryButton: null,
  images: {
    path: '/images/home/earn/',
    attributes: [
      { src: 'BTC_', alt: 'BTC image' },
      // { src: 'pie', alt: 'Pie chart' },
      // { src: 'stonks', alt: 'Stocks chart' },
      // { src: 'folder', alt: 'Folder with cake token' },
    ],
  },
}

export const cakeSectionData: SalesSectionProps = {
  headingText: 'No Front Running Risk',
  // headingText: 'CAKE makes our world go round.',
  bodyText: 'No surprises, get tokens at the price you intend to pay.',
  // 'CAKE token is at the heart of the Telos EVM Demo Swap ecosystem. Buy it, win it, farm it, spend it, stake it... heck, you can even vote with it!',
  reverse: false,
  primaryButton: {
    to: '/swap',
    text: 'Trade Now',
    // text: 'Buy CAKE',
    external: false,
  },
  secondaryButton: null,
  images: {
    path: '/images/home/cake/',
    attributes: [
      // { src: 'bottom-right', alt: 'Small 3d pancake' },
      // { src: 'top-right', alt: 'Small 3d pancake' },
      // { src: 'coin', alt: 'CAKE token' },
      // { src: 'top-left', alt: 'Small 3d pancake' },
      { src: 'BTC_', alt: 'BTC image' },
    ],
  },
}
