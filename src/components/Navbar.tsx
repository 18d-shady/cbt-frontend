"use client";


export default function Navbar({ studentName }: { studentName?: string }) {
  return (
    <nav className="w-full bgg-main z-50 font-grotesk p-4 h-16">
      <div className="flex flex-row justify-between items-center text-white w-full h-full">
        <h4 className="text-xl">CBT Exam</h4>
        <h5 className="text-xl">{studentName}</h5>

      </div>
    </nav>
  );
};

