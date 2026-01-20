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

interface Question {
  id: number;
  question_number: number;
  question_text: string;
  question_type: 'obj' | 'tf' | 'fitg' | 'essay';
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  student_answer?: string | null;
  images?: { image: string; caption?: string }[];
}

export default function ExamScreen() {
  const { examId } = useParams();
  const router = useRouter();

  const [exam, setExam] = useState<any>(null);
  const [student, setStudent] = useState<any>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [answerText, setAnswerText] = useState<string>("");
  
  // Track which questions are answered for the palette
  const [answeredList, setAnsweredList] = useState<Record<number, boolean>>({});

  useEffect(() => {
    async function init() {
      try {
        const id = Number(examId);
        const examData = await getExamDetail(id);
        setExam(examData.exam);
        setStudent(examData.student);
        setTotalQuestions(examData.exam.total_questions);

        // Discrepancy Fix: Fetch all question statuses for the palette
        // If your examData doesn't include status, we fetch current question
        const q = await getQuestionByIndex(id, 0);
        setQuestion(q);
        setAnswerText(q.student_answer || "");

        // Initialize palette: if the first question has an answer, mark it
        if (q.student_answer) {
            setAnsweredList(prev => ({ ...prev, 0: true }));
        }

        const t = await getRemainingTime(id);
        // If remaining_time is 0, the backend fixed-start logic has already expired
        if (t.remaining_time <= 0) {
          router.push(`/submit?error=Time is up`);
          return;
        }
        setTimeLeft(t.remaining_time);
      } catch (err) {
        router.push(`/prelim?examId=${examId}&error=Could not load session`);
      }
    }
    init();
  }, [examId, router]);

  // Sync time
  useEffect(() => {
    const sync = setInterval(async () => {
      try {
        const t = await getRemainingTime(Number(examId));
        setTimeLeft(t.remaining_time ?? 0);
      } catch { /* ignore */ }
    }, 60000);
    return () => clearInterval(sync);
  }, [examId]);

  const handleTextBlur = () => {
    if (question) {
        saveAnswer(question.id, answerText);
        // Discrepancy Fix: Update palette state locally on blur
        setAnsweredList(prev => ({ ...prev, [currentIndex]: answerText.trim() !== "" }));
    }
  };

  const handleSaveAnswer = async (value: string) => {
    if (!question) return;
    setAnswerText(value);
    
    // Update Palette locally
    setAnsweredList(prev => ({ ...prev, [currentIndex]: value.trim() !== "" }));

    if (question.question_type === 'obj' || question.question_type === 'tf') {
      await saveAnswer(question.id, value);
    }
  };

  const loadQuestion = async (index: number) => {
    const q = await getQuestionByIndex(Number(examId), index);
    setQuestion(q);
    setAnswerText(q.student_answer || "");
    setCurrentIndex(index);
    
    // Ensure palette is updated if an answer exists
    if (q.student_answer) {
        setAnsweredList(prev => ({ ...prev, [index]: true }));
    }
  };

  // Inside ExamScreen component
  const handleSubmit = async () => {
    // 1. Add Confirmation
    const hasUnanswered = Object.keys(answeredList).length < totalQuestions;
    const message = hasUnanswered 
      ? "You have unanswered questions. Are you sure you want to submit?" 
      : "Are you sure you want to submit your exam?";

    if (!window.confirm(message)) return;

    try {
      const result = await endExamSession(Number(examId));
      
      // 2. Pass more info to the submit page
      // We check if the exam has any essay questions to inform the student
      const hasEssays = exam.has_essays || false; // Ensure your backend returns this
      router.push(`/submit?score=${result.score}&hasEssays=${hasEssays}`);
    } catch (err) {
      router.push("/submit?error=Could not submit exam");
    }
  };

  const primaryColor = exam?.school?.color || "#2563eb";

  if (!exam || !question) return <div className="p-6 font-grotesk">Loading exam...</div>;

  return (
    <div 
      className="flex flex-col w-screen h-screen font-grotesk bg-gray-50 overflow-hidden"
      style={{ "--school-primary": primaryColor } as React.CSSProperties}
    >
      <Navbar 
        studentName={`${student?.first_name} ${student?.last_name}`} 
        schoolName={exam.school.name}
        schoolIcon={exam.school.icon}
      />

      <div className="flex flex-row justify-between items-center p-4 bg-white border-b shadow-sm shrink-0">
        <div>
          <h2 className="text-xl font-bold">
            {exam.course_name} — <span style={{ color: primaryColor }}>{exam.class_name}</span>
          </h2>
          <p className="text-xs text-gray-500 uppercase">
            {exam.title} | Question {currentIndex + 1} of {totalQuestions}
          </p>
        </div>
        <CountdownTimer duration={timeLeft} onTimeUp={handleSubmit} />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Question Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto border rounded-xl p-8 bg-white shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Question {question.question_number}</h3>
            <p className="text-gray-800 text-lg mb-6 leading-relaxed">{question.question_text}</p>

            {question.images && question.images.length > 0 && (
              <div className="mb-6 space-y-4">
                {question.images.map((img, idx) => (
                  <div key={idx} className="border rounded p-2 bg-gray-50 inline-block">
                    <img src={img.image} alt="Diagram" className="max-h-64 object-contain" />
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-4">
              {question.question_type === 'obj' && (
                <div className="grid grid-cols-1 gap-3">
                  {(["a", "b", "c", "d"] as const).map((letter) => (
                    <button
                      key={letter}
                      onClick={() => handleSaveAnswer(letter.toUpperCase())}
                      style={{ 
                        backgroundColor: answerText === letter.toUpperCase() ? primaryColor : '',
                        borderColor: answerText === letter.toUpperCase() ? primaryColor : '' 
                      }}
                      className={`px-5 py-3 border rounded-lg text-left transition-all ${
                        answerText === letter.toUpperCase() ? "text-white shadow-md" : "hover:bg-blue-50 bg-white"
                      }`}
                    >
                      <span className="font-bold mr-3">{letter.toUpperCase()}.</span>
                      {question[`option_${letter}` as keyof Question] as string}
                    </button>
                  ))}
                </div>
              )}

              {question.question_type === 'tf' && (
                <div className="flex gap-4">
                  {["T", "F"].map((val) => (
                    <button
                      key={val}
                      onClick={() => handleSaveAnswer(val)}
                      style={{ backgroundColor: answerText === val ? primaryColor : '' }}
                      className={`flex-1 py-4 border rounded-xl font-bold ${
                        answerText === val ? "text-white" : "bg-white"
                      }`}
                    >
                      {val === 'T' ? "TRUE" : "FALSE"}
                    </button>
                  ))}
                </div>
              )}

              {(question.question_type === 'fitg' || question.question_type === 'essay') && (
                <textarea
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                  onBlur={handleTextBlur}
                  placeholder="Type your answer here..."
                  className="w-full p-4 border rounded-xl h-40 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              )}
            </div>
          </div>
        </main>

        {/* Question Palette Sidebar */}
        <aside className="w-80 bg-white border-l p-6 overflow-y-auto hidden md:block">
          <h4 className="font-bold mb-4 text-gray-700">Question Palette</h4>
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: totalQuestions }).map((_, i) => (
              <button
                key={i}
                onClick={() => loadQuestion(i)}
                style={{ 
                   borderColor: currentIndex === i ? primaryColor : '',
                   boxShadow: currentIndex === i ? `0 0 0 2px ${primaryColor}` : ''
                }}
                className={`w-10 h-10 rounded-lg flex items-center justify-center font-semibold text-sm transition-all border
                  ${currentIndex === i ? "ring-2 ring-blue-500 ring-offset-2" : ""}
                  ${answeredList[i] ? "bg-green-500 text-white border-green-600" : "bg-gray-100 text-gray-500 border-gray-200"}
                `}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <div className="mt-8 space-y-2 text-xs">
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Answered</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-100 border rounded"></div>
                <span>Unanswered</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 border-2 border-blue-500 rounded"></div>
                <span>Current</span>
             </div>
          </div>
        </aside>
      </div>

      <footer className="bg-white border-t p-4 px-10 flex justify-between items-center shadow-lg shrink-0">
        <button
          onClick={() => loadQuestion(currentIndex - 1)}
          disabled={currentIndex === 0}
          className="px-6 py-2 rounded-lg bg-gray-200 disabled:opacity-30"
        >
          Previous
        </button>
        <button
          onClick={handleSubmit}
          className="px-8 py-2 rounded-lg bg-red-600 text-white font-bold"
        >
          Submit Exam
        </button>
        <button
          onClick={() => loadQuestion(currentIndex + 1)}
          disabled={currentIndex === totalQuestions - 1}
          style={{ backgroundColor: primaryColor }}
          className="px-6 py-2 rounded-lg text-white font-semibold disabled:opacity-30"
        >
          Next
        </button>
      </footer>
    </div>
  );
}