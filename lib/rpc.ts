export async function getBlockchainStats() {
  const rpc = process.env.NEXT_PUBLIC_RPC_URL || "http://localhost:8545";
  
  try {
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
    return { blockNumber: parseInt(data.result, 16) };
  } catch (e) {
    return { blockNumber: 0 };
  }
}
