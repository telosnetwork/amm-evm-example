import React from 'react'
import { Box, Button, Flex, InjectedModalProps, LinkExternal, Message, Text } from 'pancakeswap-uikit'
import { useWeb3React } from '@web3-react/core'
import useTokenBalance, { useGetTlosBalance } from 'hooks/useTokenBalance'
import { getCakeAddress } from 'utils/addressHelpers'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import { getTelosExplorerLink } from 'utils'
import { getFullDisplayBalance } from 'utils/formatBalance'
import CopyAddress from './CopyAddress'

interface WalletInfoProps {
  hasLowTlosBalance: boolean
  onDismiss: InjectedModalProps['onDismiss']
}

const WalletInfo: React.FC<WalletInfoProps> = ({ hasLowTlosBalance, onDismiss }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { balance } = useGetTlosBalance()
  const { balance: cakeBalance } = useTokenBalance(getCakeAddress())
  const { logout } = useAuth()

  const handleLogout = () => {
    onDismiss()
    logout()
  }

  return (
    <>
      <Text color="secondary" fontSize="12px" textTransform="uppercase" fontWeight="bold" mb="8px">
        {t('Your Address')}
      </Text>
      <CopyAddress account={account} mb="24px" />
      {hasLowTlosBalance && (
        <Message variant="warning" mb="24px">
          <Box>
            <Text fontWeight="bold">{t('TLOS Balance Low')}</Text>
            <Text as="p">{t('You need TLOS for transaction fees.')}</Text>
          </Box>
        </Message>
      )}
      <Flex alignItems="center" justifyContent="space-between">
        <Text color="textSubtle">{t('TLOS Balance')}</Text>
        <Text>{getFullDisplayBalance(balance, 18, 6)}</Text>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" mb="24px">
        <Text color="textSubtle">{t('CAKE Balance')}</Text>
        <Text>{getFullDisplayBalance(cakeBalance, 18, 3)}</Text>
      </Flex>
      <Flex alignItems="center" justifyContent="end" mb="24px">
        <LinkExternal href={getTelosExplorerLink(account, 'address')}>{t('View on Telos Explorer')}</LinkExternal>
      </Flex>
      <Button variant="secondary" width="100%" onClick={handleLogout}>
        {t('Disconnect Wallet')}
      </Button>
    </>
  )
}

export default WalletInfo
