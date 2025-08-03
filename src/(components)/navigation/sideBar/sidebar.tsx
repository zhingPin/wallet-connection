import styles from "./sidebar.module.css"
import SidebarTray from "./sidebarTray/sidebarTray";
import SidebarMenu from "./sidebarMenu/sidebarMenu";

const Sidebar = () => {



    return (
        <div className={styles.sidebar}>
            <SidebarMenu />
            <SidebarTray />
        </div>
    )
}

export default Sidebar