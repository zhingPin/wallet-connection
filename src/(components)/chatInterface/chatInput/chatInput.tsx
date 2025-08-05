"use client";
import React, { useState } from 'react';
import styles from './chatInput.module.css';
import SubmitBtn from './submitBtn/submitBtn';
import { useChat } from '@/(context)/useContext/chatContext';
import { Message, StructuredContent } from '@/(context)/providers/chatProvider';
import { createMessage } from '../../../app/api/getMessages';

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
            { type: "text", text: { value: input } }
        ];

        const userMsg: Message = {
            id: crypto.randomUUID(),
            sender: "user",
            content: structuredContent,
            timestamp: new Date().toISOString(),
        };
        // hi
        addMessage(userMsg);

        try {
            await createMessage(input, chatId);

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
