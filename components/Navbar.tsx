"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="border-b border-gray-800 bg-black/90 backdrop-blur fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold tracking-tight">QTC</Link>
        
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="hover:text-cyan-400 transition">Dashboard</Link>
          
          {session ? (
            <button 
              onClick={() => signOut()} 
              className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg text-sm"
            >
              Logout
            </button>
          ) : (
            <button 
              onClick={() => signIn("github")} 
              className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-2 rounded-lg font-medium"
            >
              Connect GitHub
            </button>
          )}
        </div>
      </div>
    </nav>
  );
              }
