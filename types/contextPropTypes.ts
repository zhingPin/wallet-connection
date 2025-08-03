import { EthAddress } from "../utils/helpers/wallet/connectWallet";

export interface WalletData {
    balance: string;
    address: EthAddress;
    chainId: string;
}

export interface WalletContextProps {
    currentAccount: string;
    setCurrentAccount: React.Dispatch<React.SetStateAction<string>>;
    accountBalance: string;
    CheckIfWalletConnected: () => Promise<WalletData | null>;
    handleConnectWallet: () => Promise<void>;
    currentNetwork: string;
    setCurrentNetwork: React.Dispatch<React.SetStateAction<string>>;
    setIsMetamaskInstalled?: React.Dispatch<React.SetStateAction<boolean>>;
    walletError: string;
    setWalletError: React.Dispatch<React.SetStateAction<string>>;
    isMetamaskInstalled?: boolean;
}

export interface NftContextProps {
    loading?: boolean;
    setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
    error?: string;
    setError?: React.Dispatch<React.SetStateAction<string>>;
    buyNFT: (listingId: number, tokenId: number, price: string) => Promise<void>; // Updated type
}
