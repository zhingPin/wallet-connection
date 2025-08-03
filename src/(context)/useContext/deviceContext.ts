import { useContext } from "react";
import { DeviceContext } from "../providers/deviceProvider";

export const useDevice = (): DeviceContextType => {
    const context = useContext(DeviceContext);
    if (!context) throw new Error("useDevice must be used within a DeviceProvider");
    return context;
};



