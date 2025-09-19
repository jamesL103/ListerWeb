import { NextRequest } from "next/server";
import crypto from "crypto"
import mysql from "mysql2/promise"
import "dotenv/config"

console.log(process.env.MYSQL_USER)
const connection = await mysql.createConnection({
    user: process.env.MYSQL_USER,
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DB,
})

console.log("Connected to MySQL")



export async function POST(req: NextRequest) {
    const data = await req.formData();
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
        return Response.json({message: "email already in use"}, {status: 400})
    }
    
}