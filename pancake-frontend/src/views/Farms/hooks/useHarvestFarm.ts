import { useCallback, useContext } from 'react'
import { harvestFarm, harvestFarmEosio } from 'utils/calls'
import { useMasterchefWithAccount } from 'hooks/useContract'
import { connectorLocalStorageKey, ConnectorNames } from 'pancakeswap-uikit'
import { AnchorContext } from '../../../contexts/AnchorContext'
import useActiveWeb3React from '../../../hooks/useActiveWeb3React'

const useHarvestFarm = (farmPid: number) => {
  const masterChefContract = useMasterchefWithAccount()
  const { anchorSession } = useContext(AnchorContext)
  const { account, library } = useActiveWeb3React()

  const handleHarvest = useCallback(async () => {
    if (
      anchorSession !== null &&
      window.localStorage.getItem(connectorLocalStorageKey) === ConnectorNames.Anchor &&
      window.localStorage.getItem('eth_account_by_telos_account')
    ) {
      await harvestFarmEosio(masterChefContract, farmPid, anchorSession, account, library)
    } else {
      await harvestFarm(masterChefContract, farmPid)
    }
  }, [account, anchorSession, farmPid, library, masterChefContract])

  return { onReward: handleHarvest }
}

export default useHarvestFarm
