export type MessageRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
    chatId?: string; // ID of the chat this message belongs to
    role: MessageRole;
    content: string;
    timestamp?: string; // ISO date string, e.g., "2025-07-04T12:34:56Z"
    id?: string; // Unique identifier for the message
}

export interface ChatRequest {
    chatId: string; // ID of the chat this request belongs to
    messages: ChatMessage[];
    newMessage: ChatMessage; // Optional new message to be added to the chat
    stream?: boolean; // Optional flag to indicate if the response should be streamed
}

export interface ChatResponse {
    chatId: string; // ID of the chat this response belongs to
    messages: ChatMessage[];
    streamedResponse?: string; // Optional streamed response content
}

// API TYPES
export enum StreamedMessageType {
    Content = "content",
    Error = "error",
    Connected = "connected",
    Disconnected = "disconnected",
    Done = "done",
    ToolStart = "tool_start",
    ToolEnd = "tool_end",
}

export interface BaseStreamMessage {
    type: StreamedMessageType;
}

export interface ContentMessage extends BaseStreamMessage {
    type: StreamedMessageType.Content;
    token: string; // The token data
}
export interface ErrorMessage extends BaseStreamMessage {
    type: StreamedMessageType.Error;
    error: string; // Error message
}
export interface ConnectedMessage extends BaseStreamMessage {
    type: StreamedMessageType.Connected;
    connectionId?: string; // ID of the connection
}
export interface DisconnectedMessage extends BaseStreamMessage {
    type: StreamedMessageType.Disconnected;
    connectionId?: string; // ID of the connection
}
export interface DoneMessage extends BaseStreamMessage {
    type: StreamedMessageType.Done;
    chatId: string; // ID of the chat this message belongs to
}
export interface ToolStartMessage extends BaseStreamMessage {
    type: StreamedMessageType.ToolStart;
    toolName: string; // Name of the tool that started
    parameters: Record<string, any>; // Parameters for the tool
}
export interface ToolEndMessage extends BaseStreamMessage {
    type: StreamedMessageType.ToolEnd;
    toolName: string; // Name of the tool that ended
    result: any; // Result of the tool execution
}
// Union type for all stream messages
export type StreamMessage =
    ContentMessage |
    ErrorMessage |
    ConnectedMessage |
    DisconnectedMessage |
    DoneMessage |
    ToolStartMessage |
    ToolEndMessage;

export type ChunkStatusType = 'start' | 'streaming' | 'end' | 'error';

export interface ChunkStatus {
    type: ChunkStatusType;
    data?: string; // The streamed data (if applicable)
    message?: string; // For error or status descriptions
    metadata?: Record<string, any>; // For timestamps, tool info, etc.
}
export interface StreamedMessage {
    type: StreamedMessageType;
    content?: string; // The content of the message
    error?: string; // Error message if any
    connectionId?: string; // ID of the connection if applicable
    chatId?: string; // ID of the chat this message belongs to
    toolName?: string; // Name of the tool if applicable
    parameters?: Record<string, any>; // Parameters for the tool if applicable
    result?: any; // Result of the tool execution if applicable
}    