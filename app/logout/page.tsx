import Link from "next/link"

export default function Logout () {
    return (
        <div>
            <p>Successfully logged out</p>
            <Link href="/" className="underline">Return to Homepage</Link>
        </div>
    )
}