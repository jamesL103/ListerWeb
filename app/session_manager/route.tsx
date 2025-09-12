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

    const {operation} = req.json();

    if (operation == "create"){

    }
    
    const index = connection.query('')
    
    return Response.json({}, {status: 200, statusText: "OK"})
}

async function createId() {
    connection.query("SELECT COUNT(*) FROM sessions", (err, res) => {
        if(err) {
            throw err;
        }
        console.log(res)
        const sessionId = crypto.randomInt(999999999999)
    )
}