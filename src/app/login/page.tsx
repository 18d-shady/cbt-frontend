"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginStudent } from "@/lib/student";

export default function StudentLoginPage() {
  const [examNo, setExamNo] = useState("dav101");
  const [password, setPassword] = useState("winston12");
  const [courseCode, setCourseCode] = useState("mth101");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setError(null);
    setLoading(true);

    try {
      const data = await loginStudent(examNo, courseCode, password);
      if (data.valid) {
        // redirect to prelim page with student + exam info
        const studentName = encodeURIComponent(
          `${data.student.first_name || ""} ${data.student.last_name || ""}`.trim() || data.student.username
        );
        const rules = encodeURIComponent(data.exam.rules || "");
        router.push(
          `/prelim?studentName=${studentName}&courseCode=${courseCode}&rules=${rules}`
        );
      } else {
        setError(data.error || "Invalid login");
      }
    } catch (err: any) {
      setError(err.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 font-grotesk">
      <h1 className="text-2xl font-bold">Student Login</h1>

      <div className="mt-6 w-full max-w-sm">
        <label className="block mb-2">Exam Number</label>
        <input
          type="text"
          value={examNo}
          onChange={(e) => setExamNo(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <label className="block mt-4 mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <label className="block mt-4 mb-2">Test Code</label>
        <input
          type="text"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full mt-6 bgg-main bgg-hover text-white py-2 rounded"
        >
          {loading ? "Logging in..." : "Start Test"}
        </button>

        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    </div>
  );
}
