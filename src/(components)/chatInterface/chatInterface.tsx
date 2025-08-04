import ChatWindow from './chatWindow/chatWindow';
import ChatInput from './chatInput/chatInput';
import styles from './chatInterface.module.css';
import { ChatProvider, Message, StructuredContent } from '@/(context)/providers/chatProvider';
import { getAllMessages } from '../../app/api/getMessages';

type ChatInterfaceProps = {
    chatId: string;
};

const ChatInterface = async ({ chatId }: ChatInterfaceProps) => {
    const rawMessages = await getAllMessages(chatId);

    const messages: Message[] = rawMessages.map((msg) => {
        let content: StructuredContent[];

        if (typeof msg.content === "string") {
            // Plain string → wrap in text structure
            content = [
                {
                    type: "text",
                    text: { value: msg.content },
                },
            ];
        } else if (Array.isArray(msg.content)) {
            // If it's an array of structured content (validate that it fits the shape)
            content = msg.content.map((chunk: StructuredContent) => {
                if (chunk.type === "text" && typeof chunk.text === "string") {
                    // Handle legacy text as string (upgrade it)
                    return {
                        ...chunk,
                        text: { value: chunk.text },
                    };
                }
                return chunk;
            });
        } else {
            // Unknown or malformed content → stringify it as fallback
            content = [
                {
                    type: "text",
                    text: { value: JSON.stringify(msg.content) },
                },
            ];
        }

        return {
            id: msg.id,
            sender: msg.sender,
            content,
            timestamp: msg.timestamp,
        };
    });

    return (
        <div className={styles.chatInterface}>
            <ChatProvider initialMessages={messages}>
                <div className={styles.chatInterface}>
                    <ChatWindow chatId={chatId} />
                    <ChatInput chatId={chatId} />
                </div>
            </ChatProvider>
        </div>
    );
};


export default ChatInterface;
