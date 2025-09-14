import type { NextRequest } from "next/server";
import mysql from 'mysql2/promise';
import crypto from "crypto";
import {Buffer} from "node:buffer";


const connection = await mysql.createConnection({
  user: "root",
  host: "localhost",
  database: "lister",
})

const NO_LIST_FOUND = 201;


console.log("connected to mysql")


export async function POST(req: NextRequest) {

  console.log(`Receiving request ${req.headers.get("Content-Type")}`);

  if (req.headers.get("Content-Type") === "application/json") {
    return await jsonRequest(req);
  }

  const data = await req.formData();

  console.log(data)

  const body = Object.fromEntries(data.entries());
  console.log(`Received request with body: \n ${JSON.stringify(body)}`)

  if (body.operation == "create"){
    const id = await createId();
    console.log(`Creating id ${id}`)
    return Response.json({id})
  } else if (body.operation == "getData") {

    if (!body.hasOwnProperty("id")) {
      return Response.json({}, {status:400, statusText:"Bad Request"})
    }

    const id = Number(body.id);

    return appSyncResponse(id)
  }
  
  return Response.json({}, {status: 500, statusText: "Unrecognized Operation"})
}

async function jsonRequest(req: NextRequest) {
  const body = await req.json();
  console.log(`Receiving application/json request: ${JSON.stringify(body)}`);
    if (body.operation == "sendData") {
      if (!body.hasOwnProperty("todo") || !body.hasOwnProperty("id") || !body.hasOwnProperty("resolved")) {
          return Response.json({message: "Missing property"}, {status:400, statusText:"Bad Request"})
      }
      const {id, todo, resolved} = body;
      //i'm not validating the list file they're sending right now, this is a terrible system that
      //needs to be fixed
      console.log(`Received request data: ${body}`);
      return await appSendSync(Number(id), body);
  }
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
  const [entry] = await connection.query(`SELECT todo, resolved FROM sessions WHERE session = ${sessionId} LIMIT 1`);
  console.log(`Retrieving lists from session ${sessionId}`)
  if (entry.length == 0) {
    console.log(`No lists found for session ${sessionId}`)
    return Response.json({message: "no lists found"}, {status:NO_LIST_FOUND})
  }
  console.log(`Sending lists to session ${sessionId}`)
  console.log(entry[0])
  return Response.json(entry[0])
}

async function appSendSync(sessionId: number, body:any) {
  console.log(`Updating session ${sessionId} lists`);
  console.log(body);
  const todo = Buffer.from(body.todo);
  const resolved = Buffer.from(body.resolved);
  const [result] = await connection.query(`UPDATE sessions SET ? WHERE session = ${sessionId} LIMIT 1`,
    {todo: todo, resolved: resolved}
  )
  console.log(result);
  return Response.json({files: "good"});
}