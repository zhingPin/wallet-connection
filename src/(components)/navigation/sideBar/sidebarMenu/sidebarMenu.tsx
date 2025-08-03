import React from 'react'
import { NavToggleButton } from '../../navToggleButton/navToggleButton'
import styles from "./sidebarMenu.module.css"

const SidebarMenu = () => {
    return (
        <div className={styles.sidebar_menu}>
            <NavToggleButton />
        </div>
    )
}

export default SidebarMenu