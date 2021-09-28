import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Text, Flex, Link } from 'pancakeswap-uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getTelosExplorerLink } from 'utils'
import useToast from 'hooks/useToast'
import { useBlockNumber } from '../application/hooks'
import { AppDispatch, AppState } from '../index'
import { checkedTransaction, finalizeTransaction } from './actions'
import { fetchTlosPriceUsd } from '../../utils/fetchTlosPriceUsd'
import { getFormattedDate } from '../../utils/getFormattedDate'

export function shouldCheck(
  lastBlockNumber: number,
  tx: { addedTime: number; receipt?: any; lastCheckedBlockNumber?: number },
): boolean {
  if (tx.receipt) return false
  if (!tx.lastCheckedBlockNumber) return true
  const blocksSinceCheck = lastBlockNumber - tx.lastCheckedBlockNumber
  if (blocksSinceCheck < 1) return false
  const minutesPending = (new Date().getTime() - tx.addedTime) / 1000 / 60
  if (minutesPending > 60) {
    // every 10 blocks if pending for longer than an hour
    return blocksSinceCheck > 9
  }
  if (minutesPending > 5) {
    // every 3 blocks if pending more than 5 minutes
    return blocksSinceCheck > 2
  }
  // otherwise every block
  return true
}

export default function Updater(): null {
  const { library, chainId } = useActiveWeb3React()

  const lastBlockNumber = useBlockNumber()

  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector<AppState, AppState['transactions']>((s) => s.transactions)

  const transactions = useMemo(() => (chainId ? state[chainId] ?? {} : {}), [chainId, state])

  const { toastError, toastSuccess } = useToast()

  useEffect(() => {
    if (!chainId || !library || !lastBlockNumber) return

    Object.keys(transactions)
      .filter((hash) => shouldCheck(lastBlockNumber, transactions[hash]))
      .forEach((hash) => {
        library
          .getTransactionReceipt(hash)
          .then((receipt) => {
            if (receipt) {
              library
                .getBlock(receipt.blockNumber)
                .then((block) => {
                  library
                    .getTransaction(receipt.transactionHash)
                    .then((transactionResponse) => {
                      fetchTlosPriceUsd().then((tlosPriceUsd) => {
                        dispatch(
                          finalizeTransaction({
                            chainId,
                            hash,
                            receipt: {
                              blockHash: receipt.blockHash,
                              blockNumber: receipt.blockNumber,
                              contractAddress: receipt.contractAddress,
                              from: receipt.from,
                              status: receipt.status,
                              to: receipt.to,
                              transactionHash: receipt.transactionHash,
                              transactionIndex: receipt.transactionIndex,
                            },
                          }),
                        )

                        const toast = receipt.status === 1 ? toastSuccess : toastError

                        const gasPrice = transactionResponse.gasPrice.toNumber()
                        const gasUsed = receipt.gasUsed.toNumber()

                        const txFee = (gasPrice * gasUsed) / 10 ** 18
                        const txFeeInUsd = txFee * tlosPriceUsd
                        toast(
                          'Transaction receipt',
                          <Flex flexDirection="column">
                            <Text>
                              {transactions[hash]?.summary ?? `Hash: ${hash.slice(0, 8)}...${hash.slice(58, 65)}`}
                            </Text>
                            <Text>{`Completed: ${getFormattedDate(new Date(block.timestamp * 1000))}`}</Text>
                            <Text>{`Tx fee: ${txFee.toFixed(6)} TLOS ($${txFeeInUsd.toFixed(6)})`}</Text>
                            {chainId && (
                              <Link external href={getTelosExplorerLink(hash, 'transaction', chainId)}>
                                View on Telos Explorer
                              </Link>
                            )}
                          </Flex>,
                        )
                      })
                    })
                    .catch((error) => {
                      console.error(`failed to check transaction: ${hash}`, error)
                    })
                })
                .catch((error) => {
                  console.error(`failed to check block for hash: ${hash}`, error)
                })
            } else {
              dispatch(checkedTransaction({ chainId, hash, blockNumber: lastBlockNumber }))
            }
          })
          .catch((error) => {
            console.error(`failed to check transaction hash: ${hash}`, error)
          })
      })
  }, [chainId, library, transactions, lastBlockNumber, dispatch, toastSuccess, toastError])

  return null
}
