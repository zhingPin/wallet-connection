import Link from 'next/link'
import { headers } from 'next/headers'

export default async function NotFound() {
    const headersList = await headers()
    const domain = headersList.get('host')
    // const data = await getSiteData(domain)
    return (
        <main>
            <h2>Not Found: {domain}</h2>
            <p>Could not find requested resource</p>
            <Link href="/">Return Home</Link>

            <p>
                View <Link href="/blog">all posts</Link>
            </p>
        </main>
    )
}