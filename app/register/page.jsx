"use client";
import { useActionState } from "react"
import crypto from "crypto"

const GOOD = 0
const EMAIL_USED_ERROR = 1
const PASSWORD_MATCH_ERROR = 2

export default function Register() {
    
    const [state, formAction] = useActionState(validate, {status: 0})

    return (
        <div className="flex items-center justify-center w-full h-screen">
            <div className="object-center border-solid border-color-foreground border-2 rounded-md bg-background max-w-100 p-5 flex flex-col justify-center">
                <h1 className="text-4xl">Create new Account</h1>
                {state}
                <form action={formAction} name="register">
                    <TextField fieldName="Email" id="email" type="email" name="email"></TextField>
                    <SecretField fieldName="Password" id="password" name="password"></SecretField>
                    <SecretField fieldName="Confirm Password" id="confirmPw" name="confirmPassword"></SecretField>
                    <button className="rounded-lg bg-grape p-3 my-3">Sign up</button>
                </form>
            </div>
        </div>
    )
}


function TextField({fieldName, id, type = "text", name}) {
    return (
        <div className="my-5">
            <label className="text-xl">{fieldName}<br/><input type={type} id={id} name={name} required className="bg-accent text-lg w-full rounded-md"></input></label><br/>
        </div>
    )
}

function SecretField({fieldName, id, name}) {
    return (
        <div className="my-5">
            <label className="text-xl">{fieldName}<br/><input type="password" id={id} name={name} required className="bg-accent text-lg w-full rounded-md"></input></label><br/>
        </div>
    )
}

async function validate(previousState, formData) {
    const data = Object.fromEntries(formData.entries())
    console.log(data)
    if (data.password !== data.confirmPassword) {
        return {status: 2}
    }

    


    return {status: 0};
}

