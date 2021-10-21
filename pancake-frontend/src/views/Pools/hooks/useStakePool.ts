import { useCallback, useContext } from 'react'
import { useAppDispatch } from 'state'
import { updateUserStakedBalance, updateUserBalance } from 'state/actions'
import { stakeFarm, stakeFarmEosio } from 'utils/calls'
import BigNumber from 'bignumber.js'
import { DEFAULT_TOKEN_DECIMAL, DEFAULT_GAS_LIMIT } from 'config'
import { BIG_TEN } from 'utils/bigNumber'
import { useMasterchefWithAccount, useSousChefWithAccount } from 'hooks/useContract'
import { connectorLocalStorageKey, ConnectorNames } from 'pancakeswap-uikit'
import { AnchorContext } from '../../../contexts/AnchorContext'
import { sendTransactionEosio } from '../../../utils/eosioWallet'
import useActiveWeb3React from '../../../hooks/useActiveWeb3React'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

const sousStake = async (sousChefContract, amount, decimals = 18) => {
  const tx = await sousChefContract.deposit(new BigNumber(amount).times(BIG_TEN.pow(decimals)).toString(), options)
  const receipt = await tx.wait()
  return receipt.status
}

const sousStakeEosio = async (sousChefContract, amount, decimals = 18, anchorSession, account, library) => {
  const depositValue = new BigNumber(amount).times(BIG_TEN.pow(decimals)).toString()
  const estimatedGas = await sousChefContract.estimateGas.deposit(depositValue)
  await sendTransactionEosio(
    anchorSession,
    account,
    library,
    sousChefContract,
    'deposit',
    [depositValue],
    estimatedGas,
    0,
  )

  return true
}

const sousStakeTlos = async (sousChefContract, amount) => {
  const tx = await sousChefContract.deposit(new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString(), options)
  const receipt = await tx.wait()
  return receipt.status
}

const sousStakeTlosEosio = async (sousChefContract, amount, anchorSession, account, library) => {
  const stakeTlosValue = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
  const estimatedGas = await sousChefContract.estimateGas.deposit(stakeTlosValue)
  await sendTransactionEosio(
    anchorSession,
    account,
    library,
    sousChefContract,
    'deposit',
    [stakeTlosValue],
    estimatedGas,
    0,
  )

  return true
}

const useStakePool = (sousId: number, isUsingTlos = false) => {
  const dispatch = useAppDispatch()
  const { account, library } = useActiveWeb3React()
  const masterChefContract = useMasterchefWithAccount()
  const sousChefContract = useSousChefWithAccount(sousId)
  const { anchorSession } = useContext(AnchorContext)

  const handleStake = useCallback(
    async (amount: string, decimals: number) => {
      if (
        anchorSession !== null &&
        window.localStorage.getItem(connectorLocalStorageKey) === ConnectorNames.Anchor &&
        window.localStorage.getItem('eth_account_by_telos_account')
      ) {
        if (sousId === 0) {
          await stakeFarmEosio(masterChefContract, 0, amount, anchorSession, account, library)
        } else if (isUsingTlos) {
          await sousStakeTlosEosio(sousChefContract, amount, anchorSession, account, library)
        } else {
          await sousStakeEosio(sousChefContract, amount, decimals, anchorSession, account, library)
        }
      } else if (sousId === 0) {
        await stakeFarm(masterChefContract, 0, amount)
      } else if (isUsingTlos) {
        await sousStakeTlos(sousChefContract, amount)
      } else {
        await sousStake(sousChefContract, amount, decimals)
      }
      dispatch(updateUserStakedBalance(sousId, account))
      dispatch(updateUserBalance(sousId, account))
    },
    [account, anchorSession, dispatch, isUsingTlos, library, masterChefContract, sousChefContract, sousId],
  )

  return { onStake: handleStake }
}

export default useStakePool
