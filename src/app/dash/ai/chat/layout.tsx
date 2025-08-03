import { ChatProvider } from "@/(context)/providers/chatProvider";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div >
            <ChatProvider>
                <main >

                    {children}

                </main>
            </ChatProvider>

        </div>
    );
}
