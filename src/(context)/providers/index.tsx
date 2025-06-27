"use client";
import React, { ReactNode } from "react";
import WalletProvider from "./walletProvider";


export const AppProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    return (
        <WalletProvider>
            {/* <IpfsProvider>
                <NftProvider>
                    <CombinedContextProvider> */}

            {children}
            {/* </CombinedContextProvider>
                </NftProvider>
            </IpfsProvider> */}
        </WalletProvider>
    );
};