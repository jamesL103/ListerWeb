import "server-only"
import "dotenv/config"
import {cookies} from "next/headers"
import { getIronSession } from "iron-session"

const secretKey:string = process.env.SESSION_SECRET ? process.env.SECRET_SESSION : ""


type SessionData = {
    userId:string,
    email: string,
}

export async function createSession(email: string) {
    const session = await getIronSession<SessionData>(await cookies(), {password: secretKey, cookieName: "session"})
    session.email = email
    await session.save()
    return session;
}