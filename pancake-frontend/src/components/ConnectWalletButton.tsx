import React, { useContext } from 'react'
import { Button, useWalletModal } from 'pancakeswap-uikit'
// eslint-disable-next-line import/no-cycle
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import { toChecksumAddress } from 'ethereum-checksum-address'
import { AnchorContext } from '../contexts/AnchorContext'
import { createEthAccount, getEthAccountByTelosAccount } from '../utils/eosioWallet'
import useToast from '../hooks/useToast'

const ConnectWalletButton = (props) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { setAnchorSession } = useContext(AnchorContext)
  const { toastError, toastSuccess } = useToast()

  const handleConfirm = () => {
    setAnchorSession((session) => {
      if (!session) {
        toastError('Failed to establish an Anchor session.')
      } else {
        try {
          createEthAccount(session)
            .then(() => {
              getEthAccountByTelosAccount(session.auth.actor.toString()).then((ethAccount) => {
                window.localStorage.setItem('eth_account_by_telos_account', toChecksumAddress(ethAccount.address))
                toastSuccess('EVM account was created successfully!')
              })
            })
            .catch((err) => {
              console.error('Error when create eth account from Telos account', err)
              toastError('Something went wrong during the creation of the EVM account.')
            })
        } catch (error) {
          console.error('Error when create eth account from Telos account: ', error)
        }
      }
      return session
    })
  }

  const handleReject = () => {
    logout()
  }

  const { onPresentConnectModal } = useWalletModal(login, logout, handleConfirm, handleReject)

  // eslint-disable-next-line react/destructuring-assignment
  const btnText = props?.text || 'Connect Wallet'

  return (
    <Button onClick={onPresentConnectModal} {...props}>
      {t(btnText)}
    </Button>
  )
}

export default ConnectWalletButton
