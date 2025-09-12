import type { NextRequest } from "next/server";
import mysql from 'mysql2';
import crypto from "crypto"

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


export async function POST(req: NextRequest) {

    const {operation}:{operation:string} = await req.json();

    if (operation == "create"){
      const id = await createId();
      console.log(`Creating id ${id}`)
      return Response.json({id}, {status: 200, statusText: "OK"})
    }
    
    return Response.json({}, {status: 500, statusText: "Server Error"})
}

async function createId(): Promise<number> {
    return new Promise((resolve) => {
      connection.query("SELECT COUNT(*) FROM sessions", (err, res) => {
        if(err) {
            throw err;
        }
        console.log(res)
        const sessionId = crypto.randomInt(999999999999)
        resolve(sessionId);
      });
    })
    
}