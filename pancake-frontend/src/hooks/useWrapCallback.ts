import { useContext, useMemo } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { connectorLocalStorageKey, ConnectorNames } from 'pancakeswap-uikit'
import { Currency, currencyEquals, ETHER, WETH } from '../sdk'
import { tryParseAmount } from '../state/swap/hooks'
import { useTransactionAdder } from '../state/transactions/hooks'
import { useCurrencyBalance } from '../state/wallet/hooks'
import { useWETHContract } from './useContract'
import { AnchorContext } from '../contexts/AnchorContext'
import { sendTransactionEosio } from '../utils/eosioWallet'
import { TxData } from '../utils/types'

export enum WrapType {
  NOT_APPLICABLE,
  WRAP,
  UNWRAP,
}

const NOT_APPLICABLE = { wrapType: WrapType.NOT_APPLICABLE }
/**
 * Given the selected input and output currency, return a wrap callback
 * @param inputCurrency the selected input currency
 * @param outputCurrency the selected output currency
 * @param typedValue the user input value
 */
export default function useWrapCallback(
  inputCurrency: Currency | undefined,
  outputCurrency: Currency | undefined,
  typedValue: string | undefined,
): { wrapType: WrapType; execute?: undefined | (() => Promise<TxData>); inputError?: string } {
  const { chainId, account, library } = useActiveWeb3React()
  const wethContract = useWETHContract()
  const balance = useCurrencyBalance(account ?? undefined, inputCurrency)
  // we can always parse the amount typed as the input currency, since wrapping is 1:1
  const inputAmount = useMemo(() => tryParseAmount(typedValue, inputCurrency), [inputCurrency, typedValue])
  const addTransaction = useTransactionAdder()
  const { anchorSession } = useContext(AnchorContext)

  return useMemo(() => {
    if (!wethContract || !chainId || !inputCurrency || !outputCurrency) return NOT_APPLICABLE

    const sufficientBalance = inputAmount && balance && !balance.lessThan(inputAmount)

    if (inputCurrency === ETHER && currencyEquals(WETH[chainId], outputCurrency)) {
      return {
        wrapType: WrapType.WRAP,
        execute:
          sufficientBalance && inputAmount
            ? async () => {
                try {
                  if (
                    anchorSession !== null &&
                    window.localStorage.getItem(connectorLocalStorageKey) === ConnectorNames.Anchor &&
                    window.localStorage.getItem('eth_account_by_telos_account')
                  ) {
                    const estimatedGas = await wethContract.estimateGas.deposit()
                    const response = await sendTransactionEosio(
                      anchorSession,
                      account,
                      library,
                      wethContract,
                      'deposit',
                      [],
                      estimatedGas,
                      `0x${inputAmount.raw.toString(16)}`,
                      7000,
                    )
                    return {
                      txDate: response.processed.block_time,
                      txSummary: `Wrap ${inputAmount.toSignificant(6)} TLOS to WTLOS`,
                    }
                  }
                  const txReceipt = await wethContract.deposit({ value: `0x${inputAmount.raw.toString(16)}` })
                  addTransaction(txReceipt, { summary: `Wrap ${inputAmount.toSignificant(6)} TLOS to WTLOS` })
                  return {}
                } catch (error) {
                  console.error('Could not deposit', error)
                  return {}
                }
              }
            : undefined,
        inputError: sufficientBalance ? undefined : 'Insufficient TLOS balance',
      }
    }
    if (currencyEquals(WETH[chainId], inputCurrency) && outputCurrency === ETHER) {
      return {
        wrapType: WrapType.UNWRAP,
        execute:
          sufficientBalance && inputAmount
            ? async () => {
                try {
                  if (
                    anchorSession !== null &&
                    window.localStorage.getItem(connectorLocalStorageKey) === ConnectorNames.Anchor &&
                    window.localStorage.getItem('eth_account_by_telos_account')
                  ) {
                    const estimatedGas = await wethContract.estimateGas.withdraw(`0x${inputAmount.raw.toString(16)}`)
                    const response = await sendTransactionEosio(
                      anchorSession,
                      account,
                      library,
                      wethContract,
                      'withdraw',
                      [`0x${inputAmount.raw.toString(16)}`],
                      estimatedGas,
                      0,
                    )
                    return {
                      txDate: response.processed.block_time,
                      txSummary: `Unwrap ${inputAmount.toSignificant(6)} WTLOS to TLOS`,
                    }
                  }
                  const txReceipt = await wethContract.withdraw(`0x${inputAmount.raw.toString(16)}`)
                  addTransaction(txReceipt, { summary: `Unwrap ${inputAmount.toSignificant(6)} WTLOS to TLOS` })
                  return {}
                } catch (error) {
                  console.error('Could not withdraw', error)
                  return {}
                }
              }
            : undefined,
        inputError: sufficientBalance ? undefined : 'Insufficient WTLOS balance',
      }
    }
    return NOT_APPLICABLE
  }, [
    wethContract,
    chainId,
    inputCurrency,
    outputCurrency,
    inputAmount,
    balance,
    anchorSession,
    library,
    account,
    addTransaction,
  ])
}
