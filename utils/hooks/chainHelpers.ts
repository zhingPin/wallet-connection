import { networkConfig } from "../lib/chains/networkConfig";
import { networkInfo } from "../lib/chains/networkInfo";

// Accepts decimal or hex string, returns the network key or undefined
export function getNetworkKeyFromChainId(chainId: string | number): string | undefined {
    // Normalize to hex string (e.g., "0x13881")
    const hexChainId = typeof chainId === "number"
        ? `0x${chainId.toString(16)}`
        : chainId.startsWith("0x")
            ? chainId.toLowerCase()
            : `0x${parseInt(chainId, 10).toString(16)}`;

    // Find the key in networkConfig where chainId matches
    return Object.entries(networkConfig).find(
        ([, config]) => config.chainId.toLowerCase() === hexChainId
    )?.[0];
}



export function getVisibleNetworks() {
    const isProduction = process.env.NODE_ENV === "production";

    return Object.entries(networkInfo)
        .filter(([key, info]) => {
            const hasConfig = !!networkConfig[key];

            return (
                info.active &&
                (isProduction ? info.environment === "mainnet" : true) &&
                !!info.contracts?.nft &&
                !!info.contracts?.marketplace &&
                hasConfig
            );
        })
        .map(([key, info]) => ({
            key,
            ...info,
            ...networkConfig[key],
        }));
}
