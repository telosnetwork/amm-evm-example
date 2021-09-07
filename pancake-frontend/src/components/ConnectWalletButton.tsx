import React from 'react'
import { Button, useWalletModal } from 'pancakeswap-uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'

const ConnectWalletButton = (props) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  // eslint-disable-next-line react/destructuring-assignment
  const btnText = props?.text || 'Connect Wallet'

  return (
    <Button onClick={onPresentConnectModal} {...props}>
      {t(btnText)}
    </Button>
  )
}

export default ConnectWalletButton
