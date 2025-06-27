import React from 'react'
// import { useWallet } from '@/(context)/hooks/walletContext'
// import { WalletContextProps } from '../../../types/contextPropTypes'
import styles from './index.module.css'
// import ChainSwitch from './web3Connection/chainSwitch/chainSwitch'
import Web3Connection from './web3Connection'

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navigation}>Logo</div>
            <div className={styles.navigation}>
                {/* <ChainSwitch /> */}
                <Web3Connection />
            </div>
        </nav>
    )
}

export default Navbar