import "../../app/globals.css"


export default function Login() {
    return (
        <div className="relative w-full h-full">
            <div className="absolute object-center border-solid border-color-foreground border-2 rounded-md">
                <h1 className="text-xl">Login to your Account</h1>
                <form>
                    <label>Email<br/><input type="text" className="bg-accent"></input></label>
                </form>
            </div>
        </div>
    )
}