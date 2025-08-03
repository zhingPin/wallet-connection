import Sidebar from "@/(components)/navigation/sideBar/sidebar";
import styles from "./layout.module.css"
import { NavigationProvider } from "@/(context)/providers/navigationProvider";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={styles.dash}>
            <NavigationProvider>
                <Sidebar />
            </NavigationProvider>
            <main >

                {children}

            </main>
        </div>
    );
}
