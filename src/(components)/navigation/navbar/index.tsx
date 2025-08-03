import React from 'react'
import styles from './index.module.css'
import Web3Connection from './web3Connection'
import Logo from '@/(components)/Logo/Logo'

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navigation}><Logo /></div>
            <div className={styles.navigation}>
                <Web3Connection />
            </div>
        </nav>
    )
}

export default Navbar