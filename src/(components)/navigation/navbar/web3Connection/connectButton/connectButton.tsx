"use client";

import React from "react";
import { useWallet } from "@/(context)/useContext/walletContext";
import { shortenAddress } from "../../../../../../utils/hooks/address";

const ConnectButton = () => {
    const { currentAccount, handleConnectWallet } = useWallet();
    const isConnected = currentAccount !== "";
    const accountDisplay = isConnected ? shortenAddress(currentAccount) : "Connect Wallet";

    const handleClick = async () => {
        if (!isConnected) {
            await handleConnectWallet();
        }
    };

    return (
        <button onClick={handleClick}>
            {accountDisplay}
        </button>
    );
};

export default ConnectButton;
