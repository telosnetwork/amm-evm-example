import { useCallback, useContext } from 'react'
import { unstakeFarm, unstakeFarmEosio } from 'utils/calls'
import { useMasterchefWithAccount } from 'hooks/useContract'
import { connectorLocalStorageKey, ConnectorNames } from 'pancakeswap-uikit'
import { AnchorContext } from '../../../contexts/AnchorContext'
import useActiveWeb3React from '../../../hooks/useActiveWeb3React'

const useUnstakeFarms = (pid: number) => {
  const masterChefContract = useMasterchefWithAccount()
  const { anchorSession } = useContext(AnchorContext)
  const { account, library } = useActiveWeb3React()

  const handleUnstake = useCallback(
    async (amount: string) => {
      if (
        anchorSession !== null &&
        window.localStorage.getItem(connectorLocalStorageKey) === ConnectorNames.Anchor &&
        window.localStorage.getItem('eth_account_by_telos_account')
      ) {
        await unstakeFarmEosio(masterChefContract, pid, amount, anchorSession, account, library)
      } else {
        await unstakeFarm(masterChefContract, pid, amount)
      }
    },
    [account, anchorSession, library, masterChefContract, pid],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstakeFarms
