import { TelosEvmApi } from '@telosnetwork/telosevm-js/dist/telosevm-js.umd'
import AnchorLinkBrowserTransport from 'anchor-link-browser-transport'
import AnchorLink from 'anchor-link'
import fetch from 'node-fetch'
import { Transaction } from 'ethereumjs-tx'
import { DEFAULT_GAS_PRICE } from '../config'
import { calculateGasMargin } from './index'

const transport = new AnchorLinkBrowserTransport()
const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10)

export const anchor = new AnchorLink({
  transport,
  chains: [
    {
      chainId: process.env.REACT_APP_TELOS_TESTNET_CHAIN_ID,
      nodeUrl: process.env.REACT_APP_TELOS_TESTNET_URL,
    },
  ],
})

export const telosEvmApi = new TelosEvmApi({
  endpoint: process.env.REACT_APP_TELOS_TESTNET_URL,
  chainId,
  ethPrivateKeys: [],
  telosContract: process.env.REACT_APP_TELOS_EVM_CONTRACT_ACCOUNT,
  fetch,
  telosPrivateKeys: [],
})

export async function getEthAccountByTelosAccount(telosAccount) {
  return telosEvmApi.telos.getEthAccountByTelosAccount(telosAccount)
}

export async function isEthAccountExist(telosAccount) {
  let isAccountExist
  try {
    await getEthAccountByTelosAccount(telosAccount)
    isAccountExist = true
  } catch (e) {
    isAccountExist = false
  }
  return isAccountExist
}

export async function sendTransactionEosio(
  anchorSession,
  account,
  library,
  contract,
  methodName,
  args,
  estimatedGas,
  value,
) {
  const nonce = await library.getTransactionCount(account)
  const transactionData = {
    nonce,
    from: account,
    to: contract.address,
    data: contract.interface.encodeFunctionData(methodName, [...args]),
    gasPrice: DEFAULT_GAS_PRICE * 10 ** 18,
    gas: calculateGasMargin(estimatedGas).toNumber(),
    value: value || 0,
  }

  const ethereumTx = new Transaction(transactionData)
  return anchorSession.transact({
    actions: [
      {
        account: process.env.REACT_APP_TELOS_EVM_CONTRACT_ACCOUNT,
        name: 'raw',
        authorization: [
          {
            actor: anchorSession.auth.actor.toString(),
            permission: anchorSession.auth.permission.toString(),
          },
        ],
        data: {
          ram_payer: process.env.REACT_APP_TELOS_EVM_CONTRACT_ACCOUNT,
          tx: ethereumTx.serialize().toString('hex'),
          estimate_gas: false,
          sender: account.slice(2),
        },
      },
    ],
  })
}

export async function createEthAccount(session) {
  const txConf = { broadcast: true, blocksBehind: 3, expireSeconds: 30 }
  const telosAccount = session.auth.actor.toString()
  return session.transact(
    {
      actions: [
        {
          account: process.env.REACT_APP_TELOS_EVM_CONTRACT_ACCOUNT,
          name: 'create',
          authorization: [
            {
              actor: telosAccount,
              permission: session.auth.permission.toString(),
            },
          ],
          data: {
            account: telosAccount,
            data: '',
          },
        },
      ],
    },
    txConf,
  )
}
