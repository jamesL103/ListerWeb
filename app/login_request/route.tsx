import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    console.log("hello");
    const {email, password}= Object.fromEntries((await req.formData()).entries());
    
    return Response.json({email, password}, {status: 200, statusText: "OK"})
}