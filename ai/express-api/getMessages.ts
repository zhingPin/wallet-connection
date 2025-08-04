// ai/express-api/getMessages.ts.ts

import { Message } from "@/(context)/providers/chatProvider";

// export type Message =
//     {
//         id: string;
//         messageId?: string;
//         sender: "user" | "assistant"|"system";
//         content: string | string[];
//         timestamp: string;
//         // run: {
//         //     id: string;
//         //     status: string;
//         // };
//     };

export interface Assistant {
    id: string;
    name: string;
    assistantId: string;
    currentAssistant: string;
}

export const getAllMessages = async (threadId: string): Promise<Message[]> => {

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_EXPRESS_TEST_BASE_URL}/api/v1/thread/${threadId}`
        );
        const data = await res.json();
        // console.log("Received data:", data); // Debugging: log the received data
        return data.status === "success" ? data.data.messages : [];
    } catch (error) {
        console.error("Error fetching messages:", error);
        return [];
    }
};
export const getAssistants = async (): Promise<Assistant[]> => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_TEST_BASE_URL}/api/v1/assistants`,
        { cache: "no-store" }
    );
    const data = await res.json();

    return data.status === "success"
        ? data.data.assistants.map(
            (a: { _id: string; id: string; name: string }) => ({
                id: a._id,
                name: a.name,
                assistantId: a.id, // Assign `id` to `assistantId`
            })
        )
        : [];
};

export const getThreadsByAssistant = async (assistantId: string) => {
    if (!assistantId) {
        console.log("assistantId failure");
        return [];
    }
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_EXPRESS_TEST_BASE_URL}/api/v1/thread/${assistantId}/thread`
        );
        const data = await res.json();
        console.log("Received thread data:", data);
        return data.status === "success" ? data.data : [];
    } catch (error) {
        console.error("Error fetching threads:", error);
        return [];
    }
};




export const createMessage = async (content: string, threadId: string) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_EXPRESS_TEST_BASE_URL}/api/v1/chat/${threadId}/send`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content }), // You can pass additional data like `assistant` if needed
            }
        );

        if (!res.ok) {
            throw new Error("Failed to send message");
        }

        const data = await res.json();

        console.log("Message sent:", data); // Debugging: log the received data
        return data;
    } catch (error) {
        console.log("Error sending message: ", error);
        throw error; // Rethrow the error to be handled by the caller
    }
};

export const getResponseStream = async (
    threadId: string,
    onDelta: (chunk: string) => void,
    onDone?: () => void
) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_EXPRESS_TEST_BASE_URL}/api/v1/chat/${threadId}/chunks`
        );

        if (!res.ok || !res.body) throw new Error("Failed to open SSE stream");

        const reader = res.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let buffer = "";

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            const events = buffer.split("\n\n");
            buffer = events.pop() || "";

            for (const event of events) {
                if (!event.startsWith("data: ")) continue;

                const json = JSON.parse(event.slice(6));

                if (json.delta) onDelta(json.delta);
                if (json.done && onDone) onDone();
            }
        }
    } catch (err) {
        console.error("SSE stream error:", err);
    }
};
