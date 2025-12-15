"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import {
  getExamDetail,
  getQuestionByIndex,
  saveAnswer,
  getRemainingTime,
  endExamSession,
} from "@/lib/exam";
import CountdownTimer from "@/components/CountdownTimer";

// -----------------------------
// Types
// -----------------------------
interface Question {
  id: number;
  question_number: number;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  student_answer?: string | null;
}

export default function ExamScreen() {
  const { courseCode } = useParams();
  const router = useRouter();

  const [exam, setExam] = useState<any>(null);
  const [student, setStudent] = useState<any>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);


  // init exam
  useEffect(() => {
    async function init() {
      try {
        const examData = await getExamDetail(courseCode as string);
        setExam(examData.exam);
        setStudent(examData.student);
        setTotalQuestions(examData.exam.total_questions);

        const q = await getQuestionByIndex(courseCode as string, 0);
        setQuestion(q);
        setSelectedOption(q.student_answer ?? null);

        const t = await getRemainingTime(courseCode as string);
        
        if (t.remaining_time <= 0) {
          router.push(
            `/prelim?courseCode=${courseCode}&error=Session expired, please restart exam`
          );
          return;
        }
         //console.log(t);
        setTimeLeft(t.remaining_time);
      } catch (err) {
        console.error("Error initializing exam:", err);
        router.push(
          `/prelim?courseCode=${courseCode}&error=Could not start exam session`
        );
      }
    }
    init();
  }, [courseCode, router]);

  // resync time with backend every 60s
  useEffect(() => {
    const sync = setInterval(async () => {
      try {
        const t = await getRemainingTime(courseCode as string);
        setTimeLeft(t.remaining_time ?? 0);
      } catch {
        // ignore errors
      }
    }, 60000);

    return () => clearInterval(sync);
  }, [courseCode]);

  // save answer
  const handleSaveAnswer = async (option: string) => {
    if (!question) return;
    setSelectedOption(option);
    await saveAnswer(question.id, option);
  };

  // navigation
  const handleNext = async () => {
    if (currentIndex < totalQuestions - 1) {
      const next = currentIndex + 1;
      setCurrentIndex(next);
      const q = await getQuestionByIndex(courseCode as string, next);
      setQuestion(q);
      setSelectedOption(q.student_answer ?? null);
    }
  };

  const handlePrev = async () => {
    if (currentIndex > 0) {
      const prev = currentIndex - 1;
      setCurrentIndex(prev);
      const q = await getQuestionByIndex(courseCode as string, prev);
      setQuestion(q);
      setSelectedOption(q.student_answer ?? null);
    }
  };

  // submit
  const handleSubmit = async () => {
    try {
      const result = await endExamSession(courseCode as string);
      // redirect to submit page with score
      router.push(`/submit?score=${result.score}`);
    } catch (err) {
      console.error("Submit failed:", err);
      router.push("/submit?error=Could not submit exam");
    }
  };
  
  if (!exam || !question) {
    return <div className="p-6">Loading exam...</div>;
  }

  return (
    <div className="flex flex-col w-screen h-screen font-grotesk">
      <Navbar studentName={`${student?.first_name} ${student?.last_name}`} />

      {/* Exam Header */}
      <div className="flex flex-row justify-between items-center mb-4 p-4">
        <h2 className="text-xl font-bold">{exam.course_title}</h2>
        <CountdownTimer
          duration={timeLeft}
          onTimeUp={handleSubmit}
        />
      </div>

      {/* Question */}
      <div className="border rounded-lg p-6 flex flex-col flex-1 m-6">
        <h3 className="text-lg font-semibold mb-4">
          Question {question.question_number}
        </h3>
        <p className="mb-6">{question.question_text}</p>

        <div className="flex flex-col space-y-3">
          {(["A", "B", "C", "D"] as const).map((opt) => {
            const isSelected = selectedOption === opt;
            return (
              <button
                key={opt}
                onClick={() => handleSaveAnswer(opt)}
                className={`px-4 py-2 border rounded text-left transition-colors ${
                  isSelected ? "bg-blue-500 text-white" : "hover:bg-blue-100"
                }`}
              >
                {question[`option_${opt.toLowerCase()}` as keyof Question]}
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-auto pt-6 text-white">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-4 py-2 rounded bgg-main bgg-hover disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === totalQuestions - 1}
            className="px-4 py-2 rounded bgg-main bgg-hover disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {/* Submit */}
        <div className="mt-4">
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bgg-main bgg-hover text-white rounded-lg"
          >
            Submit Exam
          </button>
        </div>
      </div>
    </div>
  );
}
