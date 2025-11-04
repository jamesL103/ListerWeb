"use server"
import { getSession } from "./get_session"
import {redirect} from "next/navigation"

export default async function logout() {
    const session = await getSession()
    if (!session.isLoggedIn) {
        return
    }

    session.destroy()
    redirect("/logout")
}