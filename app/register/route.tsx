import { NextRequest } from "next/server";
import crypto from "crypto"
import mysql from "mysql2/promise"
import "dotenv/config"


const connection = mysql.createConnection({
    user: process.env.MYSQL_USER,
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DB,
})

console.log("Connected to MySQL")



export async function POST(req: NextRequest) {
    const data = await req.formData();
    const body = Object.fromEntries(data.entries())
    if (!body.hasOwnProperty("email") || !body.hasOwnProperty("password")) {
        return Response.json({message: "invalid request"}, {status: 200})
    }

    const {email, password} = body;
    const idHash = crypto.createHash('sha256');
    const pwHash = crypto.createHash('sha256');
    idHash.update(email);
    pwHash.update(password)







}