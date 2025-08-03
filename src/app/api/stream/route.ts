import { SSE_DATA_PREFIX, SSE_LINE_DELIMITER } from "@/(context)/const";
import { ChatRequest, StreamedMessageType, StreamMessage } from "../../../../types/chat/messaging-types";

function sendSSEMessage(
    writer: WritableStreamDefaultWriter<Uint8Array>,
    data: StreamMessage
) {
    const encoder = new TextEncoder();
    return writer.write(
        encoder.encode(
            `${SSE_DATA_PREFIX}${JSON.stringify(data)}${SSE_LINE_DELIMITER}`));
}

export async function POST(request: Request) {
    // const { chatId, messages } = await request.json();

    // if (!chatId || !messages) {
    //     return new Response("Invalid request", { status: 400 });
    // }



    const body = (await request.json()) as ChatRequest;
    const { chatId, messages, newMessage } = body;

    // const mongo = connectToDatabase();

    const stream = new TransformStream({}, { highWaterMark: 1024 });
    const writer = stream.writable.getWriter();
    // const encoder = new TextEncoder();

    const response = new Response(stream.readable, {
        headers: {
            "Content-Type": "text/event-stream",
            // "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",

        },
    });
    const startStream = async () => {
        try {
            await sendSSEMessage(writer, {
                type: StreamedMessageType.Content,
                token: "Starting stream...",
            });

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/${chatId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    chatId,
                    messages,
                    newMessage,
                    stream: true,
                }),
            });

            if (!response.body) throw new Error("No response body");

            const reader = response.body.getReader();

            while (true) {
                const { done } = await reader.read();
                if (done) break;

                // const chunk = new TextDecoder().decode(value);

                await sendSSEMessage(writer, {
                    type: StreamedMessageType.Connected,
                    // content: chunk,
                });
            }

            await writer.close();

        } catch (error) {
            console.error("Error in startStream:", error);
            await writer.close();
        }
    };

    startStream()
    return response;

}