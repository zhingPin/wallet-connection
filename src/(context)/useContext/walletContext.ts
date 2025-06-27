import { WalletContext } from "../providers/walletProvider"
import { useContext } from "react"

// Custom hook to use the IPFS context
export function useWallet() {
    const context = useContext(WalletContext)
    if (!context) {
        throw new Error("useIpfs must be used within an IpfsProvider")
    }
    return context
}