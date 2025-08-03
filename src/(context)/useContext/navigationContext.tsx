import { use } from "react";
import { NavigationContext } from "../providers/navigationProvider";

export const useNavigation = () => {
    const context = use(NavigationContext);
    if (!context) {
        throw new Error("useNavigation must be used within a NavigationProvider");
    }
    return context;
};
