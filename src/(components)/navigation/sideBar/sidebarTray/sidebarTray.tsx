"use client"
import styles from "./sidebarTray.module.css"
import { useNavigation } from '@/(context)/useContext/navigationContext';

const SidebarTray = () => {
    const { isNavOpen } = useNavigation();

    // console.log("isNavOpen", isNavOpen)
    return (
        <div className={`${styles.sidebar_tray} ${isNavOpen ? styles.sidebar_tray_open : ''}`}>
        </div>
    )
}

export default SidebarTray