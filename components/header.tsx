import ProfileView from "./profile_view"

export default function Header() {
  return (
    <div className="bg-accent w-full p-5 relative">
      <a className="text-3xl inline" href="/">Lister</a>
      <ProfileView></ProfileView>
    </div>
  )
}