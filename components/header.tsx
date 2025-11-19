import ProfileView from "./profile_view"

export default function Header() {
  return (
    <div className="flex items-center bg-accent w-full p-5">
      <a className="text-3xl inline" href="/"><img src='/icon.png' className="w-15 inline"></img>Lister</a>
      <ProfileView></ProfileView>
    </div>
  )
}