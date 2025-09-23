import status from "../register/status"
import {redirect, RedirectType} from "next/navigation"
// const {scryptSync} =  await import("node:crypto")

export async function signup(previousState, formData) {
    const data = Object.fromEntries(formData.entries())
    console.log(data)

    //validate data here
    if (data.password !== data.confirmPassword) {
        return status.PASSWORD_MATCH_ERROR
    }

    const req = {
        method: "POST",
        body: formData
    }

    const res = await fetch("/register_request", req)
    console.log(res)
    const resBody = await res.json();
    console.log(resBody)
    if (resBody?.error == status.EMAIL_USED_ERROR) {
        return status.EMAIL_USED_ERROR
    }
    redirect("/register/confirm", RedirectType.replace)
}