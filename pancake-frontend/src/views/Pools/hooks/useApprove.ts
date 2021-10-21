import { useCallback, useContext, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { ethers, Contract } from 'ethers'
import BigNumber from 'bignumber.js'
import { useAppDispatch } from 'state'
import { updateUserAllowance } from 'state/actions'
import { useTranslation } from 'contexts/Localization'
import { useCake, useSousChef, useCakeVaultContract } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import useLastUpdated from 'hooks/useLastUpdated'
import { connectorLocalStorageKey, ConnectorNames } from 'pancakeswap-uikit'
import useGetAccount from '../../../hooks/useGetAccount'
import useActiveWeb3React from '../../../hooks/useActiveWeb3React'
import { AnchorContext } from '../../../contexts/AnchorContext'
import { EOSIO_SUCCESS_TX_STATUS, sendTransactionEosio } from '../../../utils/eosioWallet'

export const useApprovePool = (lpContract: Contract, sousId, earningTokenSymbol) => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { account, library } = useActiveWeb3React()
  const { anchorSession } = useContext(AnchorContext)
  const sousChefContract = useSousChef(sousId)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      let txStatus
      if (
        anchorSession !== null &&
        window.localStorage.getItem(connectorLocalStorageKey) === ConnectorNames.Anchor &&
        window.localStorage.getItem('eth_account_by_telos_account')
      ) {
        const estimatedGas = await lpContract.estimateGas.approve(sousChefContract.address, ethers.constants.MaxUint256)
        const txResult = await sendTransactionEosio(
          anchorSession,
          account,
          library,
          lpContract,
          'approve',
          [sousChefContract.address, ethers.constants.MaxUint256],
          estimatedGas,
          0,
        )
        txStatus = txResult?.processed?.receipt?.status === EOSIO_SUCCESS_TX_STATUS ? 1 : 0
      } else {
        const tx = await lpContract.approve(sousChefContract.address, ethers.constants.MaxUint256)
        const receipt = await tx.wait()
        txStatus = receipt.status
      }

      dispatch(updateUserAllowance(sousId, account))
      if (txStatus) {
        toastSuccess(
          t('Contract Enabled'),
          t('You can now stake in the %symbol% pool!', { symbol: earningTokenSymbol }),
        )
        setRequestedApproval(false)
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedApproval(false)
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
    }
  }, [
    anchorSession,
    dispatch,
    sousId,
    account,
    lpContract,
    sousChefContract.address,
    library,
    toastSuccess,
    t,
    earningTokenSymbol,
    toastError,
  ])

  return { handleApprove, requestedApproval }
}

// Approve CAKE auto pool
export const useVaultApprove = (setLastUpdated: () => void) => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { t } = useTranslation()
  const { toastSuccess, toastError } = useToast()
  const { account, library } = useActiveWeb3React()
  const { anchorSession } = useContext(AnchorContext)
  const cakeVaultContract = useCakeVaultContract()
  const cakeContract = useCake()

  const handleApprove = async () => {
    let txStatus
    setRequestedApproval(true)
    if (
      anchorSession !== null &&
      window.localStorage.getItem(connectorLocalStorageKey) === ConnectorNames.Anchor &&
      window.localStorage.getItem('eth_account_by_telos_account')
    ) {
      const estimatedGas = await cakeContract.estimateGas.approve(
        cakeVaultContract.address,
        ethers.constants.MaxUint256,
      )
      const txResult = await sendTransactionEosio(
        anchorSession,
        account,
        library,
        cakeContract,
        'approve',
        [cakeVaultContract.address, ethers.constants.MaxUint256],
        estimatedGas,
        0,
      )
      txStatus = txResult?.processed?.receipt?.status === EOSIO_SUCCESS_TX_STATUS ? 1 : 0
    } else {
      const tx = await cakeContract.approve(cakeVaultContract.address, ethers.constants.MaxUint256)
      const receipt = await tx.wait()
      txStatus = receipt.status
    }

    if (txStatus) {
      toastSuccess(t('Contract Enabled'), t('You can now stake in the %symbol% vault!', { symbol: 'CAKE' }))
      setLastUpdated()
      setRequestedApproval(false)
    } else {
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      setRequestedApproval(false)
    }
  }

  return { handleApprove, requestedApproval }
}

export const useCheckVaultApprovalStatus = () => {
  const [isVaultApproved, setIsVaultApproved] = useState(false)
  // const { account } = useWeb3React()
  const account = useGetAccount()
  const cakeContract = useCake()
  const cakeVaultContract = useCakeVaultContract()
  const { lastUpdated, setLastUpdated } = useLastUpdated()
  useEffect(() => {
    const checkApprovalStatus = async () => {
      try {
        const response = await cakeContract.allowance(account, cakeVaultContract.address)
        const currentAllowance = new BigNumber(response.toString())
        setIsVaultApproved(currentAllowance.gt(0))
      } catch (error) {
        setIsVaultApproved(false)
      }
    }

    checkApprovalStatus()
  }, [account, cakeContract, cakeVaultContract, lastUpdated])

  return { isVaultApproved, setLastUpdated }
}
