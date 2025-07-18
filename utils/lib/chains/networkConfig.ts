import { NetworkConfigProps } from "../../../types/web3/chain-types";

export const networkConfig: Record<string, NetworkConfigProps> = {
    hardhat: {
        chainId: `0x${Number(31337).toString(16)}`,
        chainName: "Hardhat",
        nativeCurrency: {
            name: "ETH",
            symbol: "HHETH",
            decimals: 18,
        },
        rpcUrls: [
            "http://127.0.0.1:8545",
            "http://localhost:8545"
        ],
        blockExplorerUrls: ["http://localhost:3001"],
    },
    polygon: {
        chainId: `0x${Number(137).toString(16)}`,
        chainName: "Polygon Mainnet",
        nativeCurrency: {
            name: "POL",
            symbol: "POL",
            decimals: 18,
        },
        rpcUrls: [
            "https://polygon-rpc.com",
            "https://rpc-mainnet.maticvigil.com",
            "https://polygon-mainnet.g.alchemy.com/v2/3ZLq2XKn1y46ClMV6jmLio0vYxEJaz1z"],
        blockExplorerUrls: ["https://polygonscan.com"],
    },
    polygon_amoy: {
        chainId: `0x${Number(80002).toString(16)}`,
        chainName: "Polygon Amoy",
        nativeCurrency: {
            name: "POL",
            symbol: "POL",
            decimals: 18,
        },
        rpcUrls: [
            "https://rpc-amoy.polygon.technology/"],
        blockExplorerUrls: ["https://amoy.polygonscan.com/"],
    },
    base: {
        chainId: `0x${Number(8453).toString(16)}`,
        chainName: "Base",
        nativeCurrency: {
            name: "ETH",
            symbol: "ETH",
            decimals: 18,
        },
        rpcUrls: ["base-mainnet.infura.io"],
        blockExplorerUrls: ["basescan.org"],
    },
    arbitrum_one: {
        chainId: `0x${Number(42161).toString(16)}`,
        chainName: "Arbitrum 1",
        nativeCurrency: {
            name: "ETH",
            symbol: "ETH",
            decimals: 18,
        },
        rpcUrls: [
            "arb1.arbitrum.io/rpc"],
        blockExplorerUrls: ["https://arbiscan.io"],
    },
    bsc: {
        chainId: `0x${Number(56).toString(16)}`,
        chainName: "Binance",
        nativeCurrency: {
            name: "BNB",
            symbol: "BNB",
            decimals: 18,
        },
        rpcUrls: [
            "bsc-dataseed4.defibit.io"],
        blockExplorerUrls: ["bscscan.com"],
    },
}
