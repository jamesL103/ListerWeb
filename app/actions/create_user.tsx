import { NextRequest } from "next/server";
import mysql from "mysql2/promise"
import bcrypt from "bcrypt";
import "dotenv/config"
import status from "../register/status.jsx"

const connection = await mysql.createConnection({
    user: process.env.MYSQL_USER,
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DB,
})

console.log("Connected to MySQL")

export type userCreateResult = {
    status: number,
    message: string
}

export async function createUser(data: {email:string, password:string}) : Promise<userCreateResult> { 
    console.log(`received register request ${JSON.stringify(data)}`)
    let {email, password} = data;
    email = String(email).toLowerCase();
    // check if email already registered
    const [res] = await connection.query("SELECT COUNT(email) AS count FROM users WHERE email = ?", [email])
    const count = res[0].count;
    console.log(res)
    //register new user
    if (count != 0) {
        return {status: status.EMAIL_USED_ERROR, message: "email already in use"}
    }

    // hash password
    const hash = await bcrypt.hash(password, 10);
    const query = `INSERT INTO users (email, hash) VALUES (?, ?)`

    const sqlRes = await connection.query(query, [email, hash]);
    console.log(JSON.stringify(sqlRes))

    if (sqlRes[0].affectedRows < 1) {
        return {status: 1, message: "Couldn't register user"}
    }

    return {status: status.GOOD, message: "success"}
}