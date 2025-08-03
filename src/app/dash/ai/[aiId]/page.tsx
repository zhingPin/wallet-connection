import React from 'react'
import { getThreadsByAssistant } from '../../../../../ai/express-api/getMessages';
import styles from "./page.module.css"
import Link from 'next/link';
type Props = {
    params: Promise<{ aiId: string }>; // Ensure params is properly awaited
}

type Thread = {
    _id?: string;
    title?: string;
};

const Page = async ({ params }: Props) => {
    const { aiId } = await params; // ✅ Await the entire params object
    const threads = await getThreadsByAssistant(aiId);

    if (!threads || threads.length === 0) {
        return (
            <div className={styles.threadBox}>
                <h2>Threads</h2>
                <label>Select an Thread:</label>

                <div className={styles.noThreads}>No threads available</div>
            </div>
        );
    }

    return (
        <div className={styles.threadBox}>
            <h2>Threads</h2>
            <label>Select an Thread:</label>

            <ul className={styles.threadList}>
                {threads.map((thread: Thread, index: number) => (
                    <li key={thread._id || index} className={styles.threadItem}>
                        <Link
                            href={`/dash/ai/chat/${thread._id}`}
                            className={thread._id ? "font-bold text-blue-500" : ""}
                        >
                            {thread._id}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default Page;