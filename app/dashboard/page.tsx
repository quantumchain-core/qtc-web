"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { data: session } = useSession();
  const [blockNumber, setBlockNumber] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(fetchBlock, 5000);
    fetchBlock();
    return () => clearInterval(interval);
  }, []);

  const fetchBlock = async () => {
    try {
      const res = await fetch("/api/block");
      const data = await res.json();
      setBlockNumber(data.blockNumber);
    } catch (e) {}
    setLoading(false);
  };

  if (!session) return <div className="text-center pt-32">Please login with GitHub</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-5xl font-bold mb-8">Validator Dashboard</h1>
      <p className="text-gray-400 mb-10">Welcome, {session.user?.name}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-zinc-900 p-8 rounded-3xl">
          <p className="text-gray-400">Current Block</p>
          <p className="text-5xl font-mono mt-3">{blockNumber}</p>
        </div>
        
        <div className="bg-zinc-900 p-8 rounded-3xl">
          <p className="text-gray-400">Your Balance</p>
          <p className="text-5xl font-mono mt-3">1,245 QTC</p>
        </div>

        <div className="bg-zinc-900 p-8 rounded-3xl">
          <p className="text-gray-400">Blocks Proposed</p>
          <p className="text-5xl font-mono mt-3">87</p>
        </div>

        <div className="bg-zinc-900 p-8 rounded-3xl">
          <p className="text-gray-400">Uptime</p>
          <p className="text-5xl font-mono mt-3 text-green-400">99.8%</p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Recent Activity</h2>
        <div className="bg-zinc-900 rounded-3xl p-8 text-gray-400">
          Connect your node to see live data.
        </div>
      </div>
    </div>
  );
}
