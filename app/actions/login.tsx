"use server"
import { getSession } from "./get_session";
import { redirect, RedirectType } from "next/navigation";
import bcrypt from "bcrypt"
import mysql2 from "mysql2/promise"

const LOGIN_SUCCESS = 0
const LOGIN_FAILED = 1

const connection = await mysql2.createConnection({
    user: process.env.MYSQL_USER,
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DB,
})

export default async function login(currentState: number, formData: FormData) {
    console.log("logging in");
    const req = {
        method: "POST",
        body: formData
    }

    const res = await validateLogin(formData)
    
    if (res == LOGIN_FAILED) {
        return LOGIN_FAILED
    }

    const session = await getSession()
    session.email = formData.get("email") as string
    session.isLoggedIn = true
    await session.save();
    redirect("/", RedirectType.replace)
}

//authenticates the login form data
async function validateLogin(formData: FormData) {
    console.log(`Receiving login request:`)
    const body =  Object.fromEntries(formData.entries())
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
        return LOGIN_SUCCESS
    } else {
        console.log("Invalid password")
        return LOGIN_FAILED
    }
}