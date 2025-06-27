"use client";
import styles from './chainSwitch.module.css';
import Image from "next/image";
import { DEFAULT_NETWORK } from '@/(context)/const';
import Dropdown from '@/(components)/dropdown/dropdown';
import { FaChevronDown } from "react-icons/fa";
import { useWallet } from '@/(context)/useContext/walletContext';
import { networkInfo } from '../../../../../utils/lib/chains/networkInfo';
import { getVisibleNetworks } from '../../../../../utils/hooks/chainHelpers';
import { handleNetworkSwitch } from '../../../../../utils/helpers/wallet/switchNetwork';


const ChainSwitch = () => {
    const { currentNetwork, setCurrentNetwork, currentAccount, handleConnectWallet } = useWallet();

    const isConnected = currentAccount !== "";

    const visibleNetworks = getVisibleNetworks();

    const selectedKey = currentNetwork || DEFAULT_NETWORK;
    const networkLogo = networkInfo[selectedKey]?.iconUrls?.[0];

    const switchNetworks = async (chainKey: string) => {
        console.log(`[chainSwitch] network: ${currentNetwork}`);
        console.log(`[chainSwitch] account: ${currentAccount}`);
        if (!isConnected) {
            console.warn("Please connect your wallet before switching networks.");
            await handleConnectWallet(); // Optional: auto-connect
            return;
        }

        try {
            const switched = await handleNetworkSwitch(chainKey);
            if (switched) {
                setCurrentNetwork(switched);
                // console.log("Switched to network:", switched);
            } else {
                console.warn("Network switch unsuccessful or cancelled by user.");
            }
        } catch (error) {
            console.error("Error switching networks:", error);
        }
    };

    // if (currentAccount) {
    //     console.log(`[chainSwitch] network: ${currentNetwork}`);
    //     console.log(`[chainSwitch] account: ${currentAccount}`);
    // }
    return (
        <Dropdown
            trigger={
                <div className={styles.chain_switch} title="Select a chain">
                    <div className={styles.greyBackground}>
                        {networkLogo && (
                            <Image
                                className={styles.chain}
                                src={networkLogo}
                                height={25}
                                width={25}
                                alt={`${networkInfo[selectedKey]?.displayName || "Chain"} logo`}
                                title={`${networkInfo[selectedKey]?.displayName || "Chain"} logo`}
                            />
                        )}
                    </div>
                    <FaChevronDown className={styles.chevron} />
                </div>
            }
            dropdownClassName={styles.menu_popover}
        >
            <ul>
                {visibleNetworks.map((network) => (
                    <li key={network.key} onClick={() => switchNetworks(network.key)}>
                        <Image
                            title={`${network.displayName}`}
                            src={network.iconUrls[0]}
                            alt={`${network.displayName} logo`}
                            height={20}
                            width={20}
                            className={styles.menuLogo}
                        />
                        <span>{network.displayName}</span>
                    </li>
                ))}
            </ul>
        </Dropdown>
    );
};

export default ChainSwitch;
