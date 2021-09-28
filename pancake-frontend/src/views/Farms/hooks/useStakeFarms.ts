import { useCallback, useContext } from 'react'
import { stakeFarm, stakeFarmEosio } from 'utils/calls'
import { useMasterchefWithAccount } from 'hooks/useContract'
import { connectorLocalStorageKey, ConnectorNames } from 'pancakeswap-uikit'
import { AnchorContext } from '../../../contexts/AnchorContext'
import useActiveWeb3React from '../../../hooks/useActiveWeb3React'

const useStakeFarms = (pid: number) => {
  const masterChefContract = useMasterchefWithAccount()
  const { anchorSession } = useContext(AnchorContext)
  const { account, library } = useActiveWeb3React()

  const handleStake = useCallback(
    async (amount: string) => {
      if (
        anchorSession !== null &&
        window.localStorage.getItem(connectorLocalStorageKey) === ConnectorNames.Anchor &&
        window.localStorage.getItem('eth_account_by_telos_account')
      ) {
        const txHash = await stakeFarmEosio(masterChefContract, pid, amount, anchorSession, account, library)
        // console.info(txHash)
      } else {
        const txHash = await stakeFarm(masterChefContract, pid, amount)
        // console.info(txHash)
      }
    },
    [account, anchorSession, library, masterChefContract, pid],
  )

  return { onStake: handleStake }
}

export default useStakeFarms
