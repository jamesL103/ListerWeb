'use client'
import {useState} from "react";

export default function GenIdDisplay() {

  const [id, setId] = useState(-1);

  async function genId() {
    const request = {
      method: "POST",
      body: JSON.stringify({operation: "create"})
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
      <button type="button" onClick={genId}>Generate User ID</button>
      <div>{id == -1 ? "failed to generate id" : id}</div>
    </div>
  )
}

