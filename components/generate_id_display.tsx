'use client'
import {useState} from "react";
import "../app/globals.css"

const id_msg = "This ID is required to synchronize your Lister App data. Store it somewhere secure:\n";

export default function GenIdDisplay() {

  const [id, setId] = useState(-1);

  async function genId() {
    const request = {
      method: "POST",
      body: new URLSearchParams({operation: "create"})
    }

    const res = await fetch("/session_manager", request);
    if (!res.ok) {
      return;
    }

    const body = await res.json();
    console.log(body)
    setId(body.id);
  }

  return (
    <div>
      <button type="button" onClick={genId} className="border-2 rounded-md bg-mint">Generate User ID</button>
      <div>{id == -1 ? "failed to generate id" : id_msg + id}</div>
    </div>
  )
}

