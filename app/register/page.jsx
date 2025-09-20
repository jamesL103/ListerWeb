"use client";
import { useActionState , useState} from "react"
import crypto from "crypto"
import status from "./status.jsx"

export default function Register() {
    
    const [state, formAction, isPending] = useActionState(validate, status.GOOD)
    const [email, setEmail] = useState("")

    return (
        <div className="flex items-center justify-center w-full h-screen">
            <div className="object-center border-solid border-color-foreground border-2 rounded-md bg-background max-w-100 p-5 flex flex-col justify-center">
                <h1 className="text-4xl">Create new Account</h1>
                {state}
                <form action={formAction} name="register">
                    <TextField fieldName="Email" id="email" type="email" name="email" value={email} setter={setEmail}></TextField>
                    <div className="text-red-100">{state == status.EMAIL_USED_ERROR ? "Email already in use" : ""}</div>
                    <SecretField fieldName="Password" id="password" name="password" outline={state == status.PASSWORD_MATCH_ERROR ? "red-500" : "none"}></SecretField>
                    <div className="text-red-500 text-xs">{state == status.PASSWORD_MATCH_ERROR ? "Passwords must match" : ""}</div>
                    <div className="text-xs">Password must be between 8-20 characters long</div>
                    <SecretField fieldName="Confirm Password" id="confirmPw" name="confirmPassword" outline={state == status.PASSWORD_MATCH_ERROR ? "red-500" : "none"}></SecretField>
                    <button className="rounded-lg bg-grape p-3 my-3">Sign Up</button>
                    {isPending ? "Loading..." : ""}
                </form>
            </div>
        </div>
    )
}


function TextField({fieldName, id, type = "text", name, value, setter}) {
    return (
        <div className="my-5">
            <label className="text-xl">{fieldName}<br/><input type={type} id={id} name={name} required value={value} onChange={(e) => setter(e.target.value)} className="bg-accent text-lg w-full rounded-md"></input></label><br/>
        </div>
    )
}

function SecretField({fieldName, id, name, outline}) {
    const className = `bg-accent text-lg w-full rounded-md outline-${outline} outline focus:outline-none`
    return (
        <div className="my-5">
            <label className="text-xl">{fieldName}<br/><input type="password" id={id} name={name} required minLength="8" maxLength="20" className={className}></input></label><br/>
        </div>
    )
}

async function validate(previousState, formData) {
    const data = Object.fromEntries(formData.entries())
    console.log(data)

    //validate data here
    if (data.password !== data.confirmPassword) {
        return status.PASSWORD_MATCH_ERROR
    }

    const hash = crypto.createHash("sha256")
    hash.update(password)
    formData.set("password", hash.digest())
    formData.delete("confirmPassword")

    const req = {
        method: "POST",
        body: formData
    }

    const res = await fetch("/register_request", req)
    console.log(res)
    const resBody = await res.json();
    

    if (resBody?.error == status.EMAIL_USED_ERROR) {
        return status.EMAIL_USED_ERROR
    }
    
    return status.GOOD;
}

