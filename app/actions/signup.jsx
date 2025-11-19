"use server"
import status from "../register/status"
import {redirect, RedirectType} from "next/navigation"
import { createUser } from "./create_user"
import { getSession } from "./get_session"

export async function signup(previousState, formData) {
    const data = Object.fromEntries(formData.entries())
    console.log(`Received form data: ${JSON.stringify(data)}`)

    //validate data here
    if (data.password !== data.confirmPassword) {
        return status.PASSWORD_MATCH_ERROR
    }
    const {email, password} = data
    const res = await createUser({email, password})

    console.log(res)

    if (res?.status == status.EMAIL_USED_ERROR) {
        return status.EMAIL_USED_ERROR
    }

    //user successfully created

    const session = await getSession()
    session.email = email
    session.isLoggedIn = true
    await session.save()

    redirect("/", RedirectType.replace)
}