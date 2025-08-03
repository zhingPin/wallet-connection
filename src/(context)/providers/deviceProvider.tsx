import { createContext, FC, ReactNode, useEffect, useState } from "react";

export const DeviceContext = createContext<DeviceContextType | null>(null);

export const DeviceProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
    const [isTablet, setIsTablet] = useState(false);

    const updateDeviceFlags = () => {
        const width = window.innerWidth;
        setIsMobile(width <= 767);
        setIsTablet(width > 767 && width <= 1024);
    };

    useEffect(() => {
        updateDeviceFlags(); // Set initial
        window.addEventListener("resize", updateDeviceFlags);
        return () => window.removeEventListener("resize", updateDeviceFlags);
    }, []);

    const [theme, setTheme] = useState<Theme>({
        mode: "light",
        colors: {
            background: "#fff",
            text: "#000",
        },
    });

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const toggleTheme = () => {
        setTheme((prevTheme) =>
            prevTheme.mode === "light"
                ? {
                    mode: "dark",
                    colors: {
                        background: "#333",
                        text: "#fff", // fixed: "#xxx" is not valid
                    },
                }
                : {
                    mode: "light",
                    colors: {
                        background: "#fff",
                        text: "#000",
                    },
                }
        );
    };
    return (
        <DeviceContext.Provider value={{ theme, toggleTheme, isMobile, isTablet }}>
            {children}
        </DeviceContext.Provider>
    );
};
