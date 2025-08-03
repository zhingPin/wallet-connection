app.post('/api/chat/:threadId/stream', async (req, res) => {
    res.set({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    });

    const sendEvent = (data) => {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    const { threadId } = req.params;
    const { assistantId, content } = req.body;

    const runMessage = await client.beta.threads.messages.create(threadId, {
        role: "user",
        content,
    });

    const run = await client.beta.threads.runs.create(threadId, {
        assistant_id: assistantId,
    });

    sendEvent({ type: "run_started", runId: run.id });

    const pollRunStatus = async () => {
        let status = "queued";
        while (status === "queued" || status === "in_progress" || status === "requires_action") {
            const updatedRun = await client.beta.threads.runs.retrieve(threadId, run.id);
            status = updatedRun.status;

            sendEvent({ type: "run_status", status });

            if (status === "requires_action") {
                // handle tools if needed (you can adapt your handleRunToolCalls here)
            }

            await new Promise((r) => setTimeout(r, 2000)); // polling interval
        }

        if (status === "completed") {
            const messages = await client.beta.threads.messages.list(threadId);
            const assistantMessage = messages.data.find(msg => msg.role === "assistant");
            sendEvent({ type: "completed", message: assistantMessage });
        } else if (status === "failed") {
            sendEvent({ type: "error", message: run.last_error?.message || "Unknown error" });
        }

        res.write(`event: done\ndata: {}\n\n`);
        res.end();
    };

    pollRunStatus();
});
