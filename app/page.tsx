import GenIdDisplay from '../components/generate_id_display';
import Link from "next/link"

export default function Home() {
  

  return (
    /*<div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        
      </footer>
    </div>*/

    <div>
        <div className='width-full border text-center p-10 bg-linear-to-b from-berry to-background'>
          <h1 className='text-7xl'>Lister</h1>
          <p className='text-xl m-20'>A task tracking application</p>
          <div className='m-10 p-auto'>
            <Link href='/' className='bg-grape p-3 rounded-full m-3'>Get Started</Link>
            <Link href='/' className='bg-accent p-3 rounded-full m-3'>Learn More</Link>
          </div>
        </div>
        <GenIdDisplay/>
    </div>  
  );
}
