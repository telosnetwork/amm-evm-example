import BigNumber from 'bignumber.js'
import { DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL } from 'config'
import { sendTransactionEosio } from '../eosioWallet'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

export const stakeFarm = async (masterChefContract, pid, amount) => {
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
  if (pid === 0) {
    const tx = await masterChefContract.enterStaking(value)
    const receipt = await tx.wait()
    return receipt.status
  }

  const tx = await masterChefContract.deposit(pid, value)
  const receipt = await tx.wait()
  return receipt.status
}

export const stakeFarmEosio = async (masterChefContract, pid, amount, anchorSession, account, library) => {
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()

  if (pid === 0) {
    const estimatedGas = await masterChefContract.estimateGas.enterStaking(value)
    await sendTransactionEosio(
      anchorSession,
      account,
      library,
      masterChefContract,
      'enterStaking',
      [value],
      estimatedGas,
      0,
    )

    return true
  }

  const estimatedGas = await masterChefContract.estimateGas.deposit(pid, value)

  await sendTransactionEosio(
    anchorSession,
    account,
    library,
    masterChefContract,
    'deposit',
    [pid, value],
    estimatedGas,
    0,
  )

  return true
}

export const unstakeFarm = async (masterChefContract, pid, amount) => {
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
  if (pid === 0) {
    const tx = await masterChefContract.leaveStaking(value, {
      gasLimit: 380000,
    })
    const receipt = await tx.wait()
    return receipt.status
  }

  const tx = await masterChefContract.withdraw(pid, value)
  const receipt = await tx.wait()
  return receipt.status
}

export const unstakeFarmEosio = async (masterChefContract, pid, amount, anchorSession, account, library) => {
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()

  if (pid === 0) {
    const estimatedGas = await masterChefContract.estimateGas.leaveStaking(value)
    await sendTransactionEosio(
      anchorSession,
      account,
      library,
      masterChefContract,
      'leaveStaking',
      [value],
      estimatedGas,
      0,
      6000,
    )
    return true
  }

  const estimatedGas = await masterChefContract.estimateGas.withdraw(pid, value)
  await sendTransactionEosio(
    anchorSession,
    account,
    library,
    masterChefContract,
    'withdraw',
    [pid, value],
    estimatedGas,
    0,
  )
  return true
}

export const harvestFarm = async (masterChefContract, pid) => {
  if (pid === 0) {
    const tx = await masterChefContract.leaveStaking('0')
    const receipt = await tx.wait()
    return receipt.status
  }

  const tx = await masterChefContract.deposit(pid, '0')
  const receipt = await tx.wait()
  return receipt.status
}

export const harvestFarmEosio = async (masterChefContract, pid, anchorSession, account, library) => {
  if (pid === 0) {
    const estimatedGas = await masterChefContract.estimateGas.leaveStaking('0')
    await sendTransactionEosio(
      anchorSession,
      account,
      library,
      masterChefContract,
      'leaveStaking',
      ['0'],
      estimatedGas,
      0,
    )
    return true
  }
  const estimatedGas = await masterChefContract.estimateGas.deposit(pid, '0')
  await sendTransactionEosio(
    anchorSession,
    account,
    library,
    masterChefContract,
    'deposit',
    [pid, '0'],
    estimatedGas,
    0,
  )
  return true
}
