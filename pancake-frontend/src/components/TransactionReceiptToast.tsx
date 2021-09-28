import React from 'react'
import { Flex, Text } from 'pancakeswap-uikit'
import { getFormattedDate } from '../utils/getFormattedDate'

export const TransactionReceiptToast = ({ txDate, txSummary }) => {
  return (
    <Flex flexDirection="column">
      <Text>{`${txSummary}`}</Text>
      <Text>{`Completed: ${getFormattedDate(txDate)}`}</Text>
    </Flex>
  )
}
