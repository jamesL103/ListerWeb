import { getIronSession, IronSession } from "iron-session";
import {SessionData, DefaultSession, sessionOptions} from "../lib/session"
import {cookies} from "next/headers"


export async function getSession() : Promise<IronSession<SessionData>> {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions)

    if (!session.isLoggedIn) { 
        session.isLoggedIn = DefaultSession.isLoggedIn
        session.email = DefaultSession.email
    } 

    return session
}
