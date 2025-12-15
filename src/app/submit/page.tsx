"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";

export default function SubmitPage() {
  const params = useSearchParams();
  const router = useRouter();

  const score = params.get("score");
  const error = params.get("error");

  const handleLogout = () => {
    // remove auth cookies
    deleteCookie("cbt_access");
    deleteCookie("cbt_refresh");

    // redirect to login
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen font-grotesk p-6">
      <h1 className="text-3xl font-bold mb-6">Exam Submitted</h1>

      {error ? (
        <div className="text-red-600 font-semibold mb-4">{error}</div>
      ) : (
        <div className="text-xl mb-4">
          🎉 Your Score: <span className="font-bold">{score}</span>
        </div>
      )}

      <button
        onClick={handleLogout}
        className="px-6 py-2 rounded-lg bgg-main bgg-hover text-white"
      >
        Logout
      </button>
    </div>
  );
}
