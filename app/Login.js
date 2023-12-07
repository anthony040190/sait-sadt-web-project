"use client"

import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";

export default function LandingPage() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const handleLogin = async () => {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error("Error signing in with GitHub:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <main>
        <h1 className="text-4xl font-bold mb-5">Login</h1>
      {user ? (
        <div className="text-lg">
          <p>
            Welcome, {user.displayName} ({user.email})
          </p>
          <p>
            <button className="text-lg hover:underline" onClick={handleLogout}>Logout</button>
          </p>
          <Link className="text-lg hover:underline" href="app\page.js">To Do List</Link>
        </div>
      ) : (
        <button onClick={handleLogin}>Login with GitHub</button>
      )}
    </main>
  );
};
