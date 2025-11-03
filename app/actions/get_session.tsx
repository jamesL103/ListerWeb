import { getIronSession, IronSession } from "iron-session";
import {SessionData, DefaultSession, sessionOptions} from "../lib/session"
import {cookies} from "next/headers"


export async function getSession() : Promise<IronSession<SessionData>> {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions)

    if (!session.isLoggedIn) { //todo: why does the example compare it directly to true
        session.isLoggedIn = DefaultSession.isLoggedIn
        session.email = DefaultSession.email
    } 

    return session
}
