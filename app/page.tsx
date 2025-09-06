import Image from "next/image";


const Layout = (props) => {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  )
};

function Header() {
  return (
    <div className="absolute top-0 bg-accent w-full p-5">
      <p className="inline text-3xl">Lister</p>
      <div className="inline absolute top-0 right-0">
        <LoginButton text="Login"/>
        <LoginButton text="Sign Up"/>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <div>

    </div>
  )
}

function LoginButton({text}) {
  return (
    <button className="bg-cyan-600 m-4 px-3 py-3 hover:bg-cyan-700 active:bg-cyan-800 rounded-sm">{text}</button>
  )
}

export default function Home() {
  return (
    /*<div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        
      </footer>
    </div>*/
    <Layout>
      <h1>AAAAAAAAAAAAAAAAAAAAAAAAAA</h1>
    </Layout>
  );
}
