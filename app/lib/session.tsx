import "server-only"
import "dotenv/config"
import {cookies} from "next/headers"
import { getIronSession, SessionOptions } from "iron-session"

const secretKey = process.env.SESSION_SECRET


export type SessionData = {
    userId:string,
    isLoggedIn: boolean,
    email: string,
}

export const DefaultSession : SessionData = {
    userId: "",
    isLoggedIn: false,
    email: "",
}


export const sessionOptions : SessionOptions = {
    password: secretKey, 
    cookieName: "session"
}

export async function createSession(email: string) {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions)
    session.email = email
    session.isLoggedIn = true
    await session.save()
    return session;
}