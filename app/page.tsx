import mysql from 'mysql2';
import GenIdDisplay from '../components/generate_id_display';

const connection = mysql.createConnection({
  user: "root",
  host: "localhost",
  database: "lister",
})

connection.connect((err) => {
  if (err){
    throw err;
  }
  console.log("connected to mysql")
})




export default function Home() {
  

  return (
    /*<div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        
      </footer>
    </div>*/

    <div>
        <GenIdDisplay/>
    </div>  
  );
}
