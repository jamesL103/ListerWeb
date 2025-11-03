import Link from "next/link"
import ProfileView from "./profile_view"

export default function Header() {
  return (
    <div className="bg-accent w-full p-5 relative">
      <a className="text-3xl inline" href="/">Lister</a>
      <ProfileView></ProfileView>
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