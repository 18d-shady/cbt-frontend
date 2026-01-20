"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";

export default function SubmitContent() {
  const params = useSearchParams();
  const router = useRouter();

  const score = params.get("score");
  const error = params.get("error");
  const hasEssays = params.get("hasEssays") === "true";

  const handleLogout = () => {
    deleteCookie("cbt_access");
    deleteCookie("cbt_refresh");
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen font-grotesk p-6 bg-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-xl border flex flex-col items-center max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Exam Submitted</h1>
        
        {error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg font-semibold mb-6">
            ⚠️ {error}
          </div>
        ) : (
          <div className="mb-8">
            <div className="text-gray-500 mb-2 uppercase tracking-widest text-sm font-bold">
              Current Points
            </div>
            <div className="text-6xl font-black text-blue-600 mb-4">
              {score}
            </div>

            {hasEssays ? (
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-blue-800 text-sm">
                <p className="font-bold mb-1">Note on Grading:</p>
                <p>
                  This score includes your <strong>Objective</strong> and <strong>Fill-in-the-Gap</strong> results. 
                  Your <strong>Essay</strong> answers are pending review by your teacher.
                </p>
              </div>
            ) : (
              <p className="text-gray-600">Well done! Your final score has been recorded.</p>
            )}
          </div>
        )}

        <button
          onClick={handleLogout}
          className="w-full px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition-colors"
        >
          Logout Session
        </button>
      </div>
    </div>
  );
}