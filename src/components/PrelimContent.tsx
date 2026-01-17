'use client';

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { startExamSession } from "@/lib/student";

export default function PrelimContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const studentName = searchParams.get("studentName") || "Student";
  const examId = searchParams.get("examId") || "";
  const rules = searchParams.get("rules") || "No rules provided.";
  const errorFromQuery = searchParams.get("error");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(errorFromQuery);

  const handleStartExam = async () => {
    setLoading(true);
    setError(null);
    try {
      await startExamSession(Number(examId));
      router.push(`/exam/${examId}`);
    } catch (err: any) {
      setError(err.error || "Could not start exam");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 font-grotesk max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">
        Welcome: <span className="fff-main">{studentName}</span>
      </h1>
      
      {error && (
        <div className="bg-red-600 text-white px-4 py-2 rounded mb-4 w-full flex justify-between items-center">
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            className="ml-4 font-bold text-white"
          >
            ×
          </button>
        </div>
      )}
      <div className="border p-4 rounded shadow w-full bg-gray-50 mb-6">
        <h2 className="font-semibold text-lg mb-2">Exam Rules</h2>
        <p className="text-gray-700 whitespace-pre-line">{rules}</p>
      </div>
      <button
        onClick={handleStartExam}
        disabled={loading}
        className="px-6 py-3 rounded-lg bgg-main bgg-hover text-white font-semibold shadow disabled:opacity-50"
      >
        {loading ? "Starting..." : "Start Exam"}
      </button>
    </div>
  );
}