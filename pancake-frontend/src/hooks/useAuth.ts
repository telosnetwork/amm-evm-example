import { useCallback, useContext } from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { NoBscProviderError } from '@binance-chain/bsc-connector'
import { toChecksumAddress } from 'ethereum-checksum-address'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'
import { ConnectorNames, connectorLocalStorageKey } from 'pancakeswap-uikit'
import { connectorsByName } from 'utils/web3React'
import { getEthAccountByTelosAccount, isEthAccountExist } from 'utils/eosioWallet'
import { setupNetwork } from 'utils/wallet'
import useToast from 'hooks/useToast'
import { profileClear } from 'state/profile'
import { useAppDispatch } from 'state'
import { useTranslation } from 'contexts/Localization'
import { AnchorContext } from '../contexts/AnchorContext'

const useAuth = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { activate, deactivate } = useWeb3React()
  const { toastError } = useToast()
  const { anchorSession, setAnchorSession } = useContext(AnchorContext)

  const login = useCallback(
    async (connectorID: ConnectorNames) => {
      const connector = connectorsByName[connectorID]
      if (connector) {
        window.localStorage.setItem('eth_account_by_telos_account', '')
        window.localStorage.setItem('is_eth_account_exist', null)
        if (connectorID === ConnectorNames.Anchor) {
          const a = await connector.login('demoswap')
          setAnchorSession(a.session)
          const actor = a.session.auth.actor.toString()
          const res = await isEthAccountExist(actor)
          window.localStorage.setItem('is_eth_account_exist', res)
          if (res) {
            const ethAccount = await getEthAccountByTelosAccount(actor)
            window.localStorage.setItem('eth_account_by_telos_account', toChecksumAddress(ethAccount.address))
          }
        } else {
          activate(connector, async (error: Error) => {
            if (error instanceof UnsupportedChainIdError) {
              const hasSetup = await setupNetwork()
              if (hasSetup) {
                activate(connector)
              }
              if (connector instanceof WalletConnectConnector && window.localStorage.getItem('walletconnect')) {
                connectorsByName.walletconnect.close()
                connectorsByName.walletconnect.walletConnectProvider = null
                deactivate()
                toastError(
                  'Provider Error',
                  'It looks like you have Telos Testnet configured incorrectly. Please recheck the RPC URL and chain id and try again.',
                )
              }
            } else {
              window.localStorage.removeItem(connectorLocalStorageKey)
              if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
                toastError(t('Provider Error'), t('No provider was found'))
              } else if (
                error instanceof UserRejectedRequestErrorInjected ||
                error instanceof UserRejectedRequestErrorWalletConnect
              ) {
                if (connector instanceof WalletConnectConnector) {
                  const walletConnector = connector as WalletConnectConnector
                  walletConnector.walletConnectProvider = null
                }
                toastError(t('Authorization Error'), t('Please authorize to access your account'))
              } else {
                toastError(error.name, error.message)
              }
            }
          })
        }
      } else {
        toastError(t('Unable to find connector'), t('The connector config is wrong'))
      }
      // return new Promise((resolve) => {
      //   resolve('Success')
      // })
    },
    [setAnchorSession, activate, deactivate, toastError, t],
  )

  const logout = useCallback(() => {
    if (window.localStorage.getItem(connectorLocalStorageKey) === ConnectorNames.Anchor && anchorSession !== null) {
      setAnchorSession(null)
      window.localStorage.setItem('is_eth_account_exist', null)
      window.localStorage.setItem('eth_account_by_telos_account', '')
    }
    dispatch(profileClear())
    deactivate()
    // This localStorage key is set by @web3-react/walletconnect-connector
    if (window.localStorage.getItem('walletconnect')) {
      connectorsByName.walletconnect.close()
      connectorsByName.walletconnect.walletConnectProvider = null
    }
  }, [deactivate, dispatch, anchorSession, setAnchorSession])

  return { login, logout }
}

export default useAuth
