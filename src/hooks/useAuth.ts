import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { injectedConnector, networkConnector } from "../utils/connectors"
import { toast } from 'react-hot-toast'
import { currentNetwork } from 'utils'

const useAuth = () => {
  const { library, chainId, activate, deactivate } = useWeb3React()

  const login = useCallback(async () => {
    await activate(injectedConnector);
    if (library && chainId != parseInt(currentNetwork)) {
      toast.error("Unsupported Network. This platform is working on Linkerby Chain");
    }
  }, [activate, library, chainId])

  const logout = useCallback(() => {
    deactivate()
  }, [deactivate])

  return { login, logout }
}

export default useAuth
