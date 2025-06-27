"use client"
import React from 'react'
import { useWallet } from '@/(context)/useContext/walletContext'
import { shortenAddress } from '../../../../../utils/hooks/address'

const ConnectButton = () => {
    const { currentAccount } = useWallet() // as WalletContextProps;
    const account = shortenAddress(currentAccount || "");

    return (
        <div>{account ? shortenAddress(account) : "Connect Wallet"}</div>
    )
}

export default ConnectButton