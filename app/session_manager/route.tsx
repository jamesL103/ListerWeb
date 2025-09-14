import type { NextRequest } from "next/server";
import mysql from 'mysql2/promise';
import crypto from "crypto"


const connection = await mysql.createConnection({
  user: "root",
  host: "localhost",
  database: "lister",
})


console.log("connected to mysql")


export async function POST(req: NextRequest) {

  const data = await req.formData();

  console.log(data)

  const body = Object.fromEntries(data.entries());
  console.log(`Received request with body: \n ${JSON.stringify(body)}`)

  if (body.operation == "create"){
    const id = await createId();
    console.log(`Creating id ${id}`)
    return Response.json({id}, {status: 200, statusText: "OK"})
  } else if (body.operation == "getData") {

    if (!body.hasOwnProperty("id")) {
      return Response.json({}, {status:400, statusText:"Bad Request"})
    }

    const id = Number(body.id);

    return appSyncResponse(id)
  } else if (body.operation == "sendData") {
    if (!body.hasOwnProperty("list") || !body.hasOwnProperty("id")) {
      return Response.json({}, {status:400, statusText:"Bad Request"})
    }

    //i'm not validating the list file they're sending right now, this is a terrible system that
    //needs to be fixed 
    const {list, id} = body;
    appSendSync(Number(id), list)
  }
  
  return Response.json({}, {status: 500, statusText: "Unrecognized Operation"})
}

async function createId(): Promise<Number> {
    const [count] = await connection.query("SELECT COUNT(*) AS count FROM sessions");
    const index = count[0].count;
    const sessionId = crypto.randomInt(999999999999) + index

    const [result] = await connection.query(`INSERT INTO sessions (session) VALUES(${sessionId})`)
    console.log(result)
    return sessionId;
}

async function appSyncResponse(sessionId: number) {
  //retrieve byte buffer representing file
  const [entry] = await connection.query(`SELECT list, complete FROM sessions WHERE session = ${sessionId} LIMIT 1`);
  console.log(`Retrieving list from session ${sessionId}`)
  if (entry.length == 0) {
    console.log(`No list found for session ${sessionId}`)
    return Response.json({}, {status:400, statusText:"Invalid session id"})
  }
  console.log(`Sending list to session ${sessionId}`)
  console.log(entry[0])
  return Response.json(entry[0])
}

async function appSendSync(sessionId: number, buffer) {
  console.log(`Updating session ${sessionId} list`)
  const [result] = await connection.query(`UPDATE sessions SET list = ${buffer} WHERE session = ${sessionId} LIMIT 1`)
  console.log(result)
  return Response.json({})
}