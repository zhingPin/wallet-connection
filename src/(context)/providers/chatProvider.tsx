"use client";

import React, { createContext, useState, ReactNode, FC } from "react";
import { createMessage } from "../../app/api/getMessages";

// 1. Define Message type
export interface StructuredContent {
    type: "text" | "image" | "button";
    text?: { value: string; annotations?: string[] }; // ✅ updated from string
    image?: { url: string; alt?: string };
    button?: { label: string; action: string };
}

export interface Message {
    id: string;
    sender: "user" | "assistant";
    content: StructuredContent[];
    timestamp: string;
}





// 2. Define context value type
type ChatContextType = {
    initialMessages?: Message[];
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    addMessage: (msg: Message) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    pollRunStatus: (chatId: string, content: string, onComplete?: () => void) => Promise<void>; // ✅ FIXED
    shouldStream: boolean,
    setShouldStream: (shouldStream: boolean) => void;
};


// 3. Create context
export const ChatContext = createContext<ChatContextType | null>(null);

type ChatProviderProps = {
    children: ReactNode;
    initialMessages?: Message[]; // ✅ allow prop
};

// 4. Props type
export const ChatProvider: FC<ChatProviderProps> = ({ children, initialMessages = [] }) => {
    const [messages, setMessages] = useState<Message[]>(initialMessages); // ✅ use it
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [shouldStream, setShouldStream] = useState(false);

    const addMessage = (msg: Message) => {
        setMessages((prev) => [...prev, msg]);
    };

    const pollRunStatus = async (chatId: string, content: string, onComplete?: () => void) => {
        let attempt = 0;
        const maxRetries = 10;

        while (attempt < maxRetries) {
            try {
                const data = await createMessage(content, chatId);

                if (data.status === "ready") {
                    console.log("✅ Run completed.");
                    setShouldStream(true); // 🔥 Trigger useEffect

                    onComplete?.();
                    break;
                }

                if (["failed", "cancelled"].includes(data.status)) {
                    console.warn("⚠️ Run failed or cancelled:", data.status);
                    break;
                }

                console.log(`⏳ Pending (${data.status})...`);
                attempt++;
                await new Promise(r => setTimeout(r, 2000));
            } catch (err) {
                console.error("Polling error:", err);
                break;
            }
        }
    };




    return (
        <ChatContext.Provider
            value={{ messages, setMessages, addMessage, isLoading, setIsLoading, pollRunStatus, shouldStream, setShouldStream }}
        >
            {children}
        </ChatContext.Provider>
    );
};
