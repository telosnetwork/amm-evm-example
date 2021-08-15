import { createStore, Store } from 'redux'
import { ChainId } from '../../sdk'
import { updateBlockNumber } from './actions'
import reducer, { ApplicationState } from './reducer'

describe('application reducer', () => {
  let store: Store<ApplicationState>

  beforeEach(() => {
    store = createStore(reducer, {
      blockNumber: {
        [ChainId.TESTNET]: 3,
      },
    })
  })

  describe('updateBlockNumber', () => {
    it('updates block number', () => {
      store.dispatch(updateBlockNumber({ chainId: ChainId.TESTNET, blockNumber: 4 }))
      expect(store.getState().blockNumber[ChainId.TESTNET]).toEqual(4)
    })
    it('no op if late', () => {
      store.dispatch(updateBlockNumber({ chainId: ChainId.TESTNET, blockNumber: 2 }))
      expect(store.getState().blockNumber[ChainId.TESTNET]).toEqual(3)
    })
  })
})
