import React from 'react'
import { Assistant, getAssistants } from '../../../../ai/express-api/getMessages';
import Link from 'next/link';

const Page = async () => {
    const assistants: Assistant[] = await getAssistants();

    return (
        <div>
            <label>Select an Assistant:</label>
            <ul>
                {assistants.map((assistant) => (
                    <li key={assistant.id}>
                        <Link
                            href={`/dash/ai/${assistant.id}`}
                            className={assistant.id ? "font-bold text-blue-500" : ""}
                        >
                            {assistant.name}
                            {assistant.id}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Page