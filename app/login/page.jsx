import { useActionState } from "react"
import "../globals.css"


export const LOGIN_SUCCESS = 0
export const LOGIN_FAILED = 1

export default function Login() {
    const [state, action, pending] = useActionState(login, 0);
    return (
        <div className="flex items-center justify-center w-full h-screen">
            <div className="object-center border-solid border-color-foreground border-2 rounded-md bg-background max-w-100 p-5 flex flex-col justify-center">
                <h1 className="text-4xl">Login to your Account</h1>
                <form action={action} name="login">
                    <TextField fieldName="Email" id="email" type="email"></TextField>
                    <TextField fieldName="Password" id="password"></TextField>
                    <div className="text-red-500 text-xs">
                        {state == LOGIN_FAILED ? "Email or Password is incorrect" : ""}
                    </div>
                    <button type="submit" className="rounded-lg bg-grape p-3 my-3">
                        {pending ? "Loading..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    )
}

function TextField({fieldName, id, type = "text"}) {

    return (
        <div className="my-5">
            <label className="text-xl">{fieldName}<br/><input type={type} id={id} name={id} required className="bg-accent text-lg w-full rounded-md"></input></label><br/>
        </div>
    )
}

async function login(previousState, formData) {

    const req = {
        method: "POST",
        body: formData
    }

    const res = await fetch("/login_request", req);
    const body = await res.json()
    if (body.auth == LOGIN_FAILED) {
        return LOGIN_FAILED
    } else {
        return LOGIN_SUCCESS
    }
}
