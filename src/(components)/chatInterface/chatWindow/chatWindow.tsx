'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './chatWindow.module.css';
import ChatBubble from './chatBubble/chatBubble';
import { getResponseStream } from '../../../app/api/getMessages';
import { useChat } from '@/(context)/useContext/chatContext';
import { Message } from '@/(context)/providers/chatProvider';

type ChatWindowProps = {
    chatId: string;
};

const ChatWindow: React.FC<ChatWindowProps> = ({ chatId }) => {
    const [streamedText, setStreamedText] = useState('');
    const streamedTextRef = useRef('');
    const [isStreaming, setIsStreaming] = useState(false);
    const messageEndRef = useRef<HTMLDivElement>(null);

    const { messages, setMessages, shouldStream, setShouldStream } = useChat(); // ✅ using context

    // Scroll to bottom when messages or stream updates
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, streamedText]);

    // Start streaming if assistant hasn't replied yet
    useEffect(() => {
        if (shouldStream) {
            setIsStreaming(true);

            getResponseStream(
                chatId,
                (chunk) => {
                    streamedTextRef.current += chunk;
                    setStreamedText(prev => prev + chunk);
                },
                () => {
                    const finalMessage: Message = {
                        id: 'streamed-' + Date.now(),
                        sender: 'assistant',
                        content: [
                            {
                                type: 'text',
                                text: {
                                    value: streamedTextRef.current,
                                },
                            },
                        ],
                        timestamp: new Date().toISOString(),
                    };
                    setMessages((prev) => [...prev, finalMessage]);
                    setStreamedText('');
                    streamedTextRef.current = '';
                    setIsStreaming(false);
                    setShouldStream(false); // ✅ Reset after done
                }
            );
        }
    }, [chatId, shouldStream, setMessages, setShouldStream]); // ✅ depends on flag



    const streamedMessage: Message = {
        id: 'streaming',
        sender: 'assistant',
        content: [
            {
                type: 'text',
                text: {
                    value: streamedText,
                },
            },
        ],
        timestamp: new Date().toISOString(),
    };

    const displayedMessages = streamedText
        ? [...messages, streamedMessage]
        : messages;

    return (
        <section className={styles.chatWindow}>
            <h2>Chat</h2>

            <ChatBubble messages={displayedMessages} />

            {isStreaming && (
                <div className={styles.typingIndicator}>Assistant is typing...</div>
            )}

            <div ref={messageEndRef} />
        </section>
    );
};

export default ChatWindow;
