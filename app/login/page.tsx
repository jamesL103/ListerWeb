import "../globals.css"


export default function Login() {
    return (
        <div className="flex items-center justify-center w-full h-screen">
            <div className="object-center border-solid border-color-foreground border-2 rounded-md bg-background max-w-100 p-5 flex flex-col justify-center">
                <h1 className="text-4xl">Login to your Account</h1>
                <form method="POST" action="/login_request" name="login">
                    <TextField fieldName="Email" id="email" type="email"></TextField>
                    <TextField fieldName="Password" id="password"></TextField>
                    <button type="submit" className="rounded-lg bg-grape p-3 my-3">Login</button>
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

async function loginAttempt() {
    const email = document.getElementById("email");
    const pw = document.getElementById("password");
    const req = {
        method: "POST",
        body: JSON.stringify({
            email: email,
            password: pw
        })
    }

    await fetch("/login_request", req);
}