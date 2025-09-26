import type { NextRequest } from "next/server";
import mysql2 from "mysql2"
import bcrypt from "bcrypt"
import {LOGIN_FAILED, LOGIN_SUCCESS} from "../login/page"

const connection = await mysql2.createConnection({
    user: process.env.MYSQL_USER,
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DB,
})

export async function POST(req: NextRequest) {
    console.log(`Receiving login request:\n${req}`)
    const body =  Object.fromEntries((await req.formData()).entries());
    const {email, password} = body;

    const query = `SELECT email, password FROM users WHERE email=?`

    const res = await connection.query(query, [email])

    if (!Object.hasOwn(res[0], "email")) { 
        return Response.json({auth : LOGIN_FAILED}, {status:408})
    }

    const hash = res[0].password

    const isValid = await bcrypt.compare(password, hash)

    if (isValid) {
        return Response.json({auth: LOGIN_SUCCESS})
    } else {
        return Response.json({auth: LOGIN_FAILED}, {status:408})
    }
}