"use client";

interface NavbarProps {
  studentName?: string;
  schoolName?: string;
  schoolIcon?: string;
}

export default function Navbar({ studentName, schoolName, schoolIcon }: NavbarProps) {
  return (
    <nav className="w-full bgg-main z-50 font-grotesk p-4 h-16 shadow-md border-b border-white/10">
      <div className="flex flex-row justify-between items-center w-full h-full">
        
        {/* Left: School Info */}
        <div className="flex items-center gap-3">
          <div className="bg-white p-1 rounded-lg">
            {schoolIcon ? (
              <img src={schoolIcon} alt="Logo" className="w-7 h-7 object-contain" />
            ) : (
              <div className="w-7 h-7 bgg-main rounded flex items-center justify-center text-[10px] text-white font-bold">
                CBT
              </div>
            )}
          </div>
          
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white leading-tight">
              {schoolName || "School Portal"}
            </span>
            <span className="text-[9px] text-green-100 font-bold tracking-widest uppercase">
              Powered by JustCBT
            </span>
          </div>
        </div>

        {/* Right: Student Info */}
        <div className="text-right">
          <h5 className="text-sm font-semibold text-white">{studentName}</h5>
          <span className="text-[10px] text-green-100/70 uppercase font-medium">
            Student Account
          </span>
        </div>

      </div>
    </nav>
  );
}