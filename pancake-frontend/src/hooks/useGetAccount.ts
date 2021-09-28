import { useWeb3React } from '@web3-react/core'
import { connectorLocalStorageKey, ConnectorNames } from 'pancakeswap-uikit'
import { useContext } from 'react'
import { AnchorContext } from '../contexts/AnchorContext'

const useGetAccount = () => {
  let account
  const { anchorSession } = useContext(AnchorContext)
  const web3Account = useWeb3React().account

  if (
    window.localStorage.getItem(connectorLocalStorageKey) === ConnectorNames.Anchor &&
    anchorSession !== null &&
    window.localStorage.getItem('eth_account_by_telos_account')
  ) {
    account = window.localStorage.getItem('eth_account_by_telos_account')
  } else {
    account = web3Account
  }
  return account
}

export default useGetAccount
