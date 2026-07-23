"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      fetchStats();
    }
  }, [session]);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/stats");
      const data = await res.json();
      setStats(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") return <div className="text-center pt-32">Loading...</div>;
  if (!session) return <div className="text-center pt-32">Please connect GitHub to access dashboard.</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-5xl font-bold mb-2">Validator Dashboard</h1>
      <p className="text-gray-400 mb-10">Welcome, {session.user?.name}</p>

      {loading ? (
        <p>Loading stats...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-900 p-8 rounded-3xl">
            <p className="text-gray-400">Your Balance</p>
            <p className="text-4xl font-mono mt-2">{stats?.balance || "0"} QTC</p>
          </div>
          <div className="bg-zinc-900 p-8 rounded-3xl">
            <p className="text-gray-400">Blocks Proposed</p>
            <p className="text-4xl font-mono mt-2">{stats?.blocks || "0"}</p>
          </div>
          <div className="bg-zinc-900 p-8 rounded-3xl">
            <p className="text-gray-400">Uptime</p>
            <p className="text-4xl font-mono mt-2">99.8%</p>
          </div>
        </div>
      )}
    </div>
  );
}
