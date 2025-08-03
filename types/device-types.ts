type Theme = {
    mode: "light" | "dark";
    colors: {
        background: string;
        text: string;
    };
};

type DeviceContextType = {
    theme: Theme;
    toggleTheme: () => void;
    isMobile: boolean;
    isTablet: boolean;
};

type NavigationContextType = {
    isNavOpen: boolean;
    toggleNav: () => void;
    openNav: () => void;
    closeNav: () => void;

}
