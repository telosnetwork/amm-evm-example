import { useCallback, useContext } from 'react'
import { useAppDispatch } from 'state'
import { updateUserBalance, updateUserPendingReward } from 'state/actions'
import { harvestFarm, harvestFarmEosio } from 'utils/calls'
import { BIG_ZERO } from 'utils/bigNumber'
import { useMasterchefWithAccount, useSousChef } from 'hooks/useContract'
import { DEFAULT_GAS_LIMIT } from 'config'
import { connectorLocalStorageKey, ConnectorNames } from 'pancakeswap-uikit'
import { sendTransactionEosio } from '../../../utils/eosioWallet'
import { AnchorContext } from '../../../contexts/AnchorContext'
import useActiveWeb3React from '../../../hooks/useActiveWeb3React'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

const harvestPool = async (sousChefContract) => {
  const tx = await sousChefContract.deposit('0', options)
  const receipt = await tx.wait()
  return receipt.status
}

const harvestPoolEosio = async (sousChefContract, anchorSession, account, library) => {
  const estimatedGas = await sousChefContract.estimateGas.deposit('0')
  await sendTransactionEosio(anchorSession, account, library, sousChefContract, 'deposit', ['0'], estimatedGas, 0)
  return true
}

const harvestPoolTlos = async (sousChefContract) => {
  const tx = await sousChefContract.deposit({ ...options, value: BIG_ZERO })
  const receipt = await tx.wait()
  return receipt.status
}

const harvestPoolTlosEosio = async (sousChefContract, anchorSession, account, library) => {
  const estimatedGas = await sousChefContract.estimateGas.deposit()
  await sendTransactionEosio(anchorSession, account, library, sousChefContract, 'deposit', [], estimatedGas, BIG_ZERO)
  return true
}

const useHarvestPool = (sousId, isUsingTlos = false) => {
  const dispatch = useAppDispatch()
  const { anchorSession } = useContext(AnchorContext)
  const { account, library } = useActiveWeb3React()
  const sousChefContract = useSousChef(sousId)
  const masterChefContract = useMasterchefWithAccount()

  const handleHarvest = useCallback(async () => {
    if (
      anchorSession !== null &&
      window.localStorage.getItem(connectorLocalStorageKey) === ConnectorNames.Anchor &&
      window.localStorage.getItem('eth_account_by_telos_account')
    ) {
      if (sousId === 0) {
        await harvestFarmEosio(masterChefContract, 0, anchorSession, account, library)
      } else if (isUsingTlos) {
        await harvestPoolTlosEosio(sousChefContract, anchorSession, account, library)
      } else {
        await harvestPoolEosio(sousChefContract, anchorSession, account, library)
      }
    } else if (sousId === 0) {
      await harvestFarm(masterChefContract, 0)
    } else if (isUsingTlos) {
      await harvestPoolTlos(sousChefContract)
    } else {
      await harvestPool(sousChefContract)
    }
    dispatch(updateUserPendingReward(sousId, account))
    dispatch(updateUserBalance(sousId, account))
  }, [account, anchorSession, dispatch, isUsingTlos, library, masterChefContract, sousChefContract, sousId])

  return { onReward: handleHarvest }
}

export default useHarvestPool
