import { NextResponse } from "next/server";

export async function GET() {
  try {
    const rpc = process.env.NEXT_PUBLIC_RPC_URL || "http://localhost:8545";
    const res = await fetch(rpc, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_blockNumber",
        params: [],
        id: 1
      })
    });
    const data = await res.json();
    return NextResponse.json({ blockNumber: parseInt(data.result, 16) || 0 });
  } catch (e) {
    return NextResponse.json({ blockNumber: 0 });
  }
}
