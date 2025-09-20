import { NextRequest } from "next/server";
import crypto from "crypto"
import mysql from "mysql2/promise"
import "dotenv/config"
import status from "../register/status.jsx"

const connection = await mysql.createConnection({
    user: process.env.MYSQL_USER,
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DB,
})

console.log("Connected to MySQL")



export async function POST(req: NextRequest) {
    /*const reader = req.body?.getReader()
    const result = await reader?.read()
    let message = ""
    for (const b of result.value) {
        message += String.fromCharCode(b)
    }*/
    const data = await req.formData();
    console.log(data)
    const body = Object.fromEntries(data.entries())
    console.log(`received register request ${JSON.stringify(body)}`)
    if (!body.hasOwnProperty("email") || !body.hasOwnProperty("password")) {
        return Response.json({message: "invalid request"}, {status: 400})
    }
    let {email, password} = body;
    email = String(email).toLowerCase();
    const pwHash = crypto.createHash('sha256');
    pwHash.update(String(password))

    // check if email already registered
    const [res] = await connection.query("SELECT COUNT(email) AS count FROM users WHERE email = ?", [email])
    const count = res[0].count;
    console.log(res)
    //register new user
    if (count != 0) {
        return Response.json({message: "email already in use", error: status.EMAIL_USED_ERROR}, {status: 400})
    }
    
    return Response.json({message: "good"}, {status: 200})
}