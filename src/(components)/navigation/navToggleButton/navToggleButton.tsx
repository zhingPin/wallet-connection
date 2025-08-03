"use client"
import { useNavigation } from "@/(context)/useContext/navigationContext";

export const NavToggleButton = () => {
    const { isNavOpen, toggleNav } = useNavigation(); // wrap the hook with `use` for async behavior

    // console.log("isNavOpen", isNavOpen)
    return (
        <button onClick={toggleNav}>
            {isNavOpen ? "Close Menu" : "Open Menu"}
        </button>
    );
};
