"use server"
import status from "../register/status"
import {redirect, RedirectType} from "next/navigation"
import { createUser } from "./create_user"

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


    redirect("/register/confirm", RedirectType.replace)
}