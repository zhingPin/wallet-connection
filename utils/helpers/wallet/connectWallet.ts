import { ethers } from "ethers";
import { WalletData } from "../../../types/contextPropTypes";

export type EthAddress = string & { readonly __brand: unique symbol };

async function getWalletData(address: string, provider: ethers.BrowserProvider, ethereum: any): Promise<WalletData> {
    console.log("[getWalletData] Fetching wallet data for address:", address);
    try {
        const balanceInWei = await provider.getBalance(address);
        console.log("[getWalletData] Raw balance (wei):", balanceInWei.toString());

        const balance = ethers.formatEther(balanceInWei);
        console.log("[getWalletData] Formatted balance (ether):", balance);

        const chainIdHex = await ethereum.request({ method: "eth_chainId" });
        console.log("[getWalletData] Chain ID (hex):", chainIdHex);

        const chainId = parseInt(chainIdHex, 16).toString();
        console.log("[getWalletData] Chain ID (decimal string):", chainId);

        return { address: address as EthAddress, balance, chainId };
    } catch (error) {
        console.error("[getWalletData] Error fetching wallet data:", error);
        throw error;  // rethrow so caller knows
    }
}

export const CheckIfWalletConnected = async (): Promise<WalletData | null> => {
    try {
        if (typeof window === "undefined") {
            console.log("[CheckIfWalletConnected] Running on server, aborting.");
            return null;
        }
        const { ethereum } = window;
        if (!ethereum) {
            console.warn("[CheckIfWalletConnected] No ethereum provider found on window.");
            return null;
        }

        console.log("[CheckIfWalletConnected] Requesting eth_accounts...");
        const accounts: string[] = await ethereum.request({ method: "eth_accounts" });
        console.log("[CheckIfWalletConnected] Accounts returned:", accounts);

        if (accounts.length === 0) {
            console.log("[CheckIfWalletConnected] No accounts connected.");
            return null;
        }

        const provider = new ethers.BrowserProvider(ethereum);
        return await getWalletData(accounts[0], provider, ethereum);
    } catch (error) {
        console.error("[CheckIfWalletConnected] Error checking if wallet is connected:", error);
        return null;
    }
};

export const ConnectWallet = async (): Promise<WalletData | null> => {
    try {
        if (typeof window === "undefined") {
            console.log("[ConnectWallet] Running on server, aborting.");
            return null;
        }
        const { ethereum } = window;
        if (!ethereum) {
            console.warn("[ConnectWallet] No ethereum provider found on window.");
            return null;
        }

        console.log("[ConnectWallet] Requesting eth_requestAccounts...");
        const accounts: string[] = await ethereum.request({ method: "eth_requestAccounts" });
        console.log("[ConnectWallet] Accounts returned:", accounts);

        if (accounts.length === 0) {
            console.log("[ConnectWallet] User rejected connection or no accounts returned.");
            return null;
        }

        const provider = new ethers.BrowserProvider(ethereum);
        return await getWalletData(accounts[0], provider, ethereum);
    } catch (error) {
        console.warn("[ConnectWallet] Error connecting wallet:", error);
        return null;
    }
};
