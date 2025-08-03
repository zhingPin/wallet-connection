// import React, { useEffect } from 'react'
import styles from './chatBubble.module.css'
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { Message } from '@/(context)/providers/chatProvider';
import Image from 'next/image';


type ChatBubbleProps = {
    messages: Message[];
};

const ChatBubble: React.FC<ChatBubbleProps> = ({ messages }) => {
    return (
        <div className={styles.chatBubble}>
            {messages.length === 0 ? (
                <p>No messages found.</p>
            ) : (
                messages.map((msg, index) => (
                    <div
                        className={`${styles.message} ${msg.sender === "assistant" ? styles.ai : styles.user
                            }`}
                        key={msg.id || index}
                    >
                        {msg.content.map((chunk, i) => {
                            if (chunk.type === "text" && chunk.text) {
                                return (
                                    <ReactMarkdown
                                        key={i}
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            code({ className, children, ...props }) {
                                                const match = /language-(\w+)/.exec(className ?? "");
                                                return match ? (
                                                    <SyntaxHighlighter
                                                        language={match[1]}
                                                        style={dracula}
                                                        PreTag="div"
                                                    >
                                                        {String(children).replace(/\n$/, "")}
                                                    </SyntaxHighlighter>
                                                ) : (
                                                    <code className={className || ""} {...props}>
                                                        {children}
                                                    </code>
                                                );
                                            },
                                            ul({ children, ...props }) {
                                                return <ul style={{ paddingLeft: "0rem" }} {...props}>{children}</ul>;
                                            },
                                            ol({ children, ...props }) {
                                                return <ol style={{ paddingLeft: "0rem" }} {...props}>{children}</ol>;
                                            },
                                            li({ children, ...props }) {
                                                return <li style={{ marginBottom: "0rem" }} {...props}>{children}</li>;
                                            },
                                        }}
                                    >
                                        {chunk.text.value}
                                    </ReactMarkdown>
                                );
                            }

                            if (chunk.type === "image" && chunk.image?.url) {
                                return (
                                    <Image
                                        key={i}
                                        src={chunk.image.url}
                                        alt={chunk.image.alt || "Image"}
                                        style={{ maxWidth: "100%", borderRadius: "8px", margin: "10px 0" }}
                                    />
                                );
                            }

                            if (chunk.type === "button" && chunk.button?.label) {
                                return (
                                    <button
                                        key={i}
                                        onClick={() => console.log(`Action: ${chunk.button?.action}`)}
                                        style={{
                                            padding: "8px 16px",
                                            background: "#222",
                                            color: "#fff",
                                            border: "none",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                            margin: "10px 0",
                                        }}
                                    >
                                        {chunk.button.label}
                                    </button>
                                );
                            }

                            return null;
                        })}
                    </div>
                ))
            )}        </div>
    );
};

export default ChatBubble