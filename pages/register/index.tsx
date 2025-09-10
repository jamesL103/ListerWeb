

export default function Register() {
    return (
        <div className="flex items-center justify-center w-full h-screen">
            <div className="object-center border-solid border-color-foreground border-2 rounded-md bg-background max-w-100 p-5 flex flex-col justify-center">
                <h1 className="text-4xl">Create new Account</h1>
                <form>
                    <TextField fieldName="Email" id="email"></TextField>
                    <TextField fieldName="Password" id="password"></TextField>
                    <TextField fieldName="Confirm Password" id="confirmPw"></TextField>
                    <button type="button" className="rounded-lg bg-grape p-3 my-3">Sign up</button>
                </form>
            </div>
        </div>
    )
}


function TextField({fieldName, id}) {

    return (
        <div className="my-5">
            <label className="text-xl">{fieldName}<br/><input type="text" id={id} className="bg-accent text-lg w-full rounded-md"></input></label><br/>
        </div>
    )
}