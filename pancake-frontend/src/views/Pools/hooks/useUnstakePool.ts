import { useCallback, useContext } from 'react'
import BigNumber from 'bignumber.js'
import { useAppDispatch } from 'state'
import { updateUserStakedBalance, updateUserBalance, updateUserPendingReward } from 'state/actions'
import { unstakeFarm, unstakeFarmEosio } from 'utils/calls'
import { useMasterchefWithAccount, useSousChef } from 'hooks/useContract'
import { BIG_TEN } from 'utils/bigNumber'
import { connectorLocalStorageKey, ConnectorNames } from 'pancakeswap-uikit'
import { AnchorContext } from '../../../contexts/AnchorContext'
import useActiveWeb3React from '../../../hooks/useActiveWeb3React'
import { sendTransactionEosio } from '../../../utils/eosioWallet'

const sousUnstake = async (sousChefContract, amount, decimals) => {
  const tx = await sousChefContract.withdraw(new BigNumber(amount).times(BIG_TEN.pow(decimals)).toString())
  const receipt = await tx.wait()
  return receipt.status
}

const sousUnstakeEosio = async (sousChefContract, amount, decimals, anchorSession, account, library) => {
  const unstakeValue = new BigNumber(amount).times(BIG_TEN.pow(decimals)).toString()
  const estimatedGas = await sousChefContract.estimateGas.withdraw(unstakeValue)
  await sendTransactionEosio(
    anchorSession,
    account,
    library,
    sousChefContract,
    'withdraw',
    [unstakeValue],
    estimatedGas,
    0,
  )
  return true
}

const sousEmergencyUnstake = async (sousChefContract) => {
  const tx = await sousChefContract.emergencyWithdraw()
  const receipt = await tx.wait()
  return receipt.status
}

const sousEmergencyUnstakeEosio = async (sousChefContract, anchorSession, account, library) => {
  const estimatedGas = await sousChefContract.estimateGas.emergencyWithdraw()
  await sendTransactionEosio(
    anchorSession,
    account,
    library,
    sousChefContract,
    'emergencyWithdraw',
    [],
    estimatedGas,
    0,
  )
  return true
}

const useUnstakePool = (sousId, enableEmergencyWithdraw = false) => {
  const dispatch = useAppDispatch()
  const { anchorSession } = useContext(AnchorContext)
  const { account, library } = useActiveWeb3React()
  const masterChefContract = useMasterchefWithAccount()
  const sousChefContract = useSousChef(sousId)

  const handleUnstake = useCallback(
    async (amount: string, decimals: number) => {
      if (
        anchorSession !== null &&
        window.localStorage.getItem(connectorLocalStorageKey) === ConnectorNames.Anchor &&
        window.localStorage.getItem('eth_account_by_telos_account')
      ) {
        if (sousId === 0) {
          await unstakeFarmEosio(masterChefContract, 0, amount, anchorSession, account, library)
        } else if (enableEmergencyWithdraw) {
          await sousEmergencyUnstakeEosio(sousChefContract, anchorSession, account, library)
        } else {
          await sousUnstakeEosio(sousChefContract, amount, decimals, anchorSession, account, library)
        }
      } else if (sousId === 0) {
        await unstakeFarm(masterChefContract, 0, amount)
      } else if (enableEmergencyWithdraw) {
        await sousEmergencyUnstake(sousChefContract)
      } else {
        await sousUnstake(sousChefContract, amount, decimals)
      }
      dispatch(updateUserStakedBalance(sousId, account))
      dispatch(updateUserBalance(sousId, account))
      dispatch(updateUserPendingReward(sousId, account))
    },
    [account, anchorSession, dispatch, enableEmergencyWithdraw, library, masterChefContract, sousChefContract, sousId],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstakePool
