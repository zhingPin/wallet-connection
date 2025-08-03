"use client"
import React, { useState, ReactNode, FC, createContext } from "react";

// ✅ Define the type first
type NavigationContextType = {
    isNavOpen: boolean;
    toggleNav: () => void;
    openNav: () => void;
    closeNav: () => void;
};


type NavigationProviderProps = {
    children: ReactNode;
};

// ✅ Use `null` as the default (recommended with safe custom hook)
export const NavigationContext = createContext<NavigationContextType | null>(null);


export const NavigationProvider: FC<NavigationProviderProps> = ({ children }) => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => setIsNavOpen((prev) => !prev);
    const openNav = () => setIsNavOpen(true);
    const closeNav = () => setIsNavOpen(false);

    return (
        <NavigationContext.Provider value={{ isNavOpen, toggleNav, openNav, closeNav }}>
            {children}
        </NavigationContext.Provider>
    );
};
