import { useCallback, useContext } from 'react'
import { ethers, Contract } from 'ethers'
import { useMasterchef } from 'hooks/useContract'
import { connectorLocalStorageKey, ConnectorNames } from 'pancakeswap-uikit'
import { AnchorContext } from '../../../contexts/AnchorContext'
import useActiveWeb3React from '../../../hooks/useActiveWeb3React'
import { sendTransactionEosio } from '../../../utils/eosioWallet'

const useApproveFarm = (lpContract: Contract) => {
  const masterChefContract = useMasterchef()
  const { account, library } = useActiveWeb3React()
  const { anchorSession } = useContext(AnchorContext)

  const handleApprove = useCallback(async () => {
    try {
      if (
        anchorSession !== null &&
        window.localStorage.getItem(connectorLocalStorageKey) === ConnectorNames.Anchor &&
        window.localStorage.getItem('eth_account_by_telos_account')
      ) {
        const estimatedGas = await lpContract.estimateGas.approve(
          masterChefContract.address,
          ethers.constants.MaxUint256,
        )
        const response = await sendTransactionEosio(
          anchorSession,
          account,
          library,
          lpContract,
          'approve',
          [masterChefContract.address, ethers.constants.MaxUint256],
          estimatedGas,
          0,
        )
        return true
      }

      const tx = await lpContract.approve(masterChefContract.address, ethers.constants.MaxUint256)
      const receipt = await tx.wait()
      return receipt.status
    } catch (e) {
      return false
    }
  }, [account, anchorSession, library, lpContract, masterChefContract.address])

  return { onApprove: handleApprove }
}

export default useApproveFarm
