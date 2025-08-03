"use client";
import React, { useState } from 'react';
import styles from './chatInput.module.css';
import SubmitBtn from './submitBtn/submitBtn';
import { useChat } from '@/(context)/useContext/chatContext';
import { Message, StructuredContent } from '@/(context)/providers/chatProvider';

type ChatInputProps = {
    chatId: string;
};

const ChatInput: React.FC<ChatInputProps> = ({ chatId }) => {
    const [input, setInput] = useState('');
    const { addMessage, isLoading, setIsLoading, pollRunStatus } = useChat();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        setIsLoading(true);

        const structuredContent: StructuredContent[] = [
            {
                type: "text",
                text: {
                    value: input,
                },
            }
        ];

        const userMsg: Message = {
            id: crypto.randomUUID(),
            sender: "user",
            content: structuredContent,
            timestamp: new Date().toISOString(),
        };

        addMessage(userMsg);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_TEST__BASE_URL}/api/v1/chat/${chatId}/send`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: input, sender: "user" }),
            });

            if (!res.ok) {
                console.error("Failed to send message");
                return;
            }

            console.log("✅ Message sent. Begin polling...");

            await pollRunStatus(chatId, input, () => {
                console.log("🧠 Polling completed. Ready for SSE response.");
            });
        } catch (err) {
            console.error("Submission error:", err);
        } finally {
            setInput('');
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.chatInput}>
            <textarea
                rows={4}
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={styles.input}
                disabled={isLoading}
            />

            <SubmitBtn />
        </form>
    );
};

export default ChatInput;
