import React from 'react'
import { Flex, UserMenuItem, WarningIcon } from 'pancakeswap-uikit'
import { useTranslation } from 'contexts/Localization'

interface WalletUserMenuItemProps {
  hasLowTlosBalance: boolean
  onPresentWalletModal: () => void
}

const WalletUserMenuItem: React.FC<WalletUserMenuItemProps> = ({ hasLowTlosBalance, onPresentWalletModal }) => {
  const { t } = useTranslation()

  return (
    <UserMenuItem as="button" onClick={onPresentWalletModal}>
      <Flex alignItems="center" justifyContent="space-between" width="100%">
        {t('Wallet')}
        {hasLowTlosBalance && <WarningIcon color="warning" width="24px" />}
      </Flex>
    </UserMenuItem>
  )
}

export default WalletUserMenuItem
