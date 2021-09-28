import React, { useEffect, useState } from 'react'
import { anchor } from '../utils/eosioWallet'

const AnchorContext = React.createContext({ anchorSession: null, setAnchorSession: null })

const AnchorContextProvider = ({ children }) => {
  const [anchorSession, setAnchorSession] = useState(null)

  const restoreSession = async () => {
    const session = await anchor.restoreSession('demoswap')
    setAnchorSession(session)
  }

  useEffect(() => {
    restoreSession()
  }, [])

  return <AnchorContext.Provider value={{ anchorSession, setAnchorSession }}>{children}</AnchorContext.Provider>
}

export { AnchorContext, AnchorContextProvider }
