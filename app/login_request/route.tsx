import type { NextRequest } from "next/server";
import mysql2 from "mysql2/promise"
import bcrypt from "bcrypt"

const connection = await mysql2.createConnection({
    user: process.env.MYSQL_USER,
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DB,
})

const LOGIN_SUCCESS = 0
const LOGIN_FAILED = 1

export async function POST(req: NextRequest) {
    console.log(`Receiving login request:`)
    const body =  Object.fromEntries((await req.formData()).entries())
    console.log(JSON.stringify(body))
    const {email, password} = body;

    const query = `SELECT email, hash FROM users WHERE email=?`

    const res = await connection.query(query, [email])
    // console.log(JSON.stringify(res))
    if (!Object.hasOwn(res[0][0], "email")) {
        console.log("Couldn't find account associated with email") 
        return Response.json({auth : LOGIN_FAILED}, {status:400})
    }

    const hash = res[0][0].hash

    const isValid = await bcrypt.compare(password, hash)

    if (isValid) {
        return Response.json({auth: LOGIN_SUCCESS})
    } else {
        console.log("Invalid password")
        return Response.json({auth: LOGIN_FAILED}, {status:400})
    }
}