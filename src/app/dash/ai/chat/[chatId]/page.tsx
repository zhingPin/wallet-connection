import ChatInterface from '@/(components)/chatInterface/chatInterface'
import React from 'react'

interface ChatPageProps {
    params: Promise<{ chatId: string }>;
}
const Page = async ({ params }: ChatPageProps) => {
    const { chatId } = await params;

    if (!chatId) {
        return <div>Error: Assistant ID is missing</div>;
    }
    // console.log("ChatPage props:", { chatId });
    return (
        <div><ChatInterface chatId={chatId} /></div>
    )

}

export default Page
