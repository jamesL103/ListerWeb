import Link from "next/link"

export default function Header() {
  return (
    <div className="bg-accent w-full p-5 relative">
      <a className="text-3xl inline" href="/">Lister</a>
      <div className="inline absolute right-0">
        <LoginButton text="Login"/>
        <SignupButton text="Sign Up"/>
      </div>
    </div>
  )
}

function LoginButton({text}) {
  return (
    <Link href="/login" className="bg-cyan-600 m-4 px-3 py-3 hover:bg-cyan-700 active:bg-cyan-800 rounded-sm">{text}</Link>
  )
}

function SignupButton({text}) {
  return (
    <Link href="/register" className="bg-cyan-600 m-4 px-3 py-3 hover:bg-cyan-700 active:bg-cyan-800 rounded-sm">{text}</Link>
  )
}