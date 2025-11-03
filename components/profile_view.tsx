import Link from "next/link"
import {getSession} from "@/app/actions/get_session"


const div_pos = "inline absolute right-0"

export default async function ProfileView() {
    const session = await getSession();
    console.log(session)
    if (session.isLoggedIn) {
        return (
            <div className={div_pos}>
                Logged in as {session.email}
                <LogoutButton></LogoutButton>
            </div>
        )
    } 

    return (
        <div className={div_pos}>
            <LoginButton text="Login"/>
            <SignupButton text="Sign Up"/>
        </div>
    )
}




function LoginButton({text} : {text: string}) {
  return (
    <Link href="/login" className="bg-cyan-600 m-4 px-3 py-3 hover:bg-cyan-700 active:bg-cyan-800 rounded-sm">{text}</Link>
  )
}

function SignupButton({text} : {text: string}) {
  return (
    <Link href="/register" className="bg-cyan-600 m-4 px-3 py-3 hover:bg-cyan-700 active:bg-cyan-800 rounded-sm">{text}</Link>
  )
}

function LogoutButton() {
    return (
        <button>Logout</button>
    )
}