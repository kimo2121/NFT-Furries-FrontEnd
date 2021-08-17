import { Contract } from '@ethersproject/contracts'
import NFFurriesABI from 'contracts/NFFurries.json'

export const Networks = {
  MainNet: 56,
  Testnet: 97,
  Rinkeby: 4,
  Kovan: 42,
}

export const CONTRACTS_BY_NETWORK = {
  [Networks.MainNet]: {
    NFFurries: {
      address: '0x92468D243209f4fbD9dF42256325EB4AaB1E345e',
      abi: NFFurriesABI,
    }
  },
  [Networks.Testnet]: {
    NFFurries: {
      address: '0x92468D243209f4fbD9dF42256325EB4AaB1E345e',
      abi: NFFurriesABI,
    }
  },
  [Networks.Rinkeby]: {
    NFFurries: {
      address: '0x92468D243209f4fbD9dF42256325EB4AaB1E345e',
      abi: NFFurriesABI,
    }
  },
  [Networks.Kovan]: {
    NFFurries: {
      address: '0x92468D243209f4fbD9dF42256325EB4AaB1E345e',
      abi: NFFurriesABI,
    }
  },
}

export const currentNetwork = process.env.REACT_APP_NETWORK_ID;

export const baseApiUrl = process.env.REACT_APP_API_URL;

export function getContractInfo(name, chainId = null) {
  if (!chainId) chainId = currentNetwork;

  const contracts = CONTRACTS_BY_NETWORK?.[chainId];
  if (contracts) {
    return contracts?.[name];
  } else {
    return null;
  }
}

export function truncateWalletString(walletAddress) {
  if (!walletAddress) return walletAddress;
  const lengthStr = walletAddress.length;
  const startStr = walletAddress.substring(0, 7);
  const endStr = walletAddress.substring(lengthStr - 7, lengthStr);
  return startStr + '...' + endStr;
}

export function truncateHashString(txhash) {
  if (!txhash) return txhash;
  const lengthStr = txhash.length;
  const startStr = txhash.substring(0, 10);
  const endStr = txhash.substring(lengthStr - 10, lengthStr);
  return startStr + '...' + endStr;
}

export function getContractObj(name, chainId, provider) {
  const info = getContractInfo(name, chainId);
  return !!info && new Contract(info.address, info.abi, provider);
}

export function getContractObjWithAddress(name, chainId, provider, contractAddress) {
  const info = getContractInfo(name, chainId);
  return !!info && new Contract(contractAddress, info.abi, provider);
}

export const shorter = (str) =>
  str?.length > 8 ? str.slice(0, 6) + '...' + str.slice(-4) : str
