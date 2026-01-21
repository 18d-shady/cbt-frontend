
"use client";
import { useState} from "react";
import Image from "next/image";
import { requestDemo } from "@/lib/school";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react"


export default function HomePage() {
  // State for Demo Modal and Form
  const [showDemo, setShowDemo] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const goToPayment = (plan: string) => {
    router.push(`/payment?plan=${plan}`);
  };

  
  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await requestDemo(formData);
      alert(`Thank you ${formData.name}, your demo request has been sent! Youll hear from us soon.`);
      setShowDemo(false);
    } catch (error) {
      alert("Failed to send request. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* DEMO MODAL OVERLAY */}
      {showDemo && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl max-w-md w-full font-grotesk shadow-2xl animate-in fade-in zoom-in duration-200">
            <h2 className="text-2xl font-bold fff-main mb-2">Experience JustCBT</h2>
            <p className="text-gray-500 text-sm mb-6">Enter your details and our team will reach out for a guided walkthrough.</p>
            
            <form onSubmit={handleDemoSubmit} className="flex flex-col gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">FULL NAME</label>
                <input 
                  required 
                  disabled={isSubmitting}
                  className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition" 
                  placeholder="e.g. Dr. Jane Smith" 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">SCHOOL EMAIL</label>
                <input 
                  required 
                  type="email" 
                  disabled={isSubmitting}
                  className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition" 
                  placeholder="admin@yourschool.com" 
                  onChange={(e) => setFormData({...formData, email: e.target.value})} 
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">PHONE NUMBER</label>
                <input 
                  required 
                  type="tel" 
                  disabled={isSubmitting}
                  className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition" 
                  placeholder="+234..." 
                  onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                />
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bgg-main text-white p-4 rounded-xl font-bold mt-2 hover:brightness-110 disabled:opacity-50 transition flex justify-center"
              >
                {isSubmitting ? "Sending..." : "Submit Request"}
              </button>
              
              <button 
                type="button" 
                disabled={isSubmitting}
                onClick={() => setShowDemo(false)} 
                className="text-gray-400 text-sm font-medium hover:text-gray-600"
              >
                Maybe later
              </button>
            </form>
          </div>
        </div>
      )}

      <nav className="sticky top-0 bg-white/80 backdrop-blur-md z-40 w-full px-6 md:px-12 py-5 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* LOGO */}
          <h1 className="text-xl font-bold fff-main tracking-tight">JustCBT</h1>

          {/* DESKTOP LINKS (Hidden on Mobile) */}
          <div className="hidden md:flex gap-8 text-sm font-semibold text-gray-700 items-center">
            <a href="#features" className="hover:text-green-600 transition">Features</a>
            <a href="#pricing" className="hover:text-green-600 transition">Pricing</a>
            <button 
              onClick={() => goToPayment('monthly')} 
              className="text-green-700 bg-green-50 px-4 py-1 rounded-full hover:bg-green-100 transition"
            >
              Get Started
            </button>
          </div>

          {/* MOBILE MENU BUTTON (Hidden on Desktop) */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* MOBILE DROPDOWN MENU */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 p-6 flex flex-col gap-6 text-center font-semibold text-gray-700 animate-in slide-in-from-top-2 duration-200">
            <a href="#features" onClick={() => setIsOpen(false)} className="hover:text-green-600">Features</a>
            <a href="#pricing" onClick={() => setIsOpen(false)} className="hover:text-green-600">Pricing</a>
            <button 
              onClick={() => { goToPayment('monthly'); setIsOpen(false); }} 
              className="w-full text-green-700 bg-green-50 py-3 rounded-xl hover:bg-green-100 transition"
            >
              Get Started
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <main className="relative min-h-[calc(100vh-80px)] flex items-center justify-center px-6 font-grotesk overflow-hidden">

        {/* LIGHT GREEN GRADIENT BACKGROUND */}
        <div className="absolute inset-0 bg-gradient-to-br 
                        from-green-50 via-white to-green-100 opacity-80" />

        {/* CONTENT */}
        <div id="main" className=" mt-20 md:mt-0 relative max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* LEFT — TEXT */}
          <div className="text-left animate-fade-slide">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 fff-main">
              Accurate Testing. Real Results.
            </h1>

            <p className="text-lg md:text-xl mb-6">
              Create, deliver, and grade computer-based tests—securely,
              instantly, at scale.
            </p>

            <p className="font-semibold mb-10">
              No crashes. No leaks. No excuses.
            </p>

            <div className="flex gap-6">
              <button onClick={() => setShowDemo(true)} className="font-bold underline underline-offset-8 fff-main hover:opacity-80 transition">
                Book a Demo
              </button>
              <button onClick={() => goToPayment('trial')} 
                className="font-bold underline underline-offset-8 fff-main hover:opacity-80 transition disabled:opacity-50"
              >
                Start Free Trial
              </button>
            </div>
          </div>

          {/* RIGHT — IMAGE + SHAPE */}
          <div className="relative w-full h-[520px] flex items-center justify-center animate-float">
            
            <div className="absolute w-[480px] h-[480px] bgg-main opacity-90
                            rounded-[60%_40%_70%_30%/40%_60%_40%_60%]" />

            <div className="relative w-[420px] h-[420px] overflow-hidden
                            rounded-[45%_55%_35%_65%/60%_40%_60%_40%] shadow-xl">
              <Image
                src="/images/medium-shot-students.jpg"
                alt="Landing"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

        </div>
      </main>

      {/* FEATURES */}
      <section id="features" className="py-24 px-6 bg-white font-grotesk">
        <div className="max-w-7xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-bold mb-4 fff-main">
            Built for Modern CBT Exams
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mb-16">
            Everything you need to create, manage, and deliver secure
            computer-based tests — from setup to results.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* CBT Exams */}
            <div className="p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 mx-auto mb-6 rounded-full bgg-main flex items-center justify-center text-white font-bold">
                CBT
              </div>
              <h3 className="font-semibold text-lg mb-3">Computer-Based Tests</h3>
              <p className="text-sm text-gray-600">Deliver secure, timed CBT exams with automatic submission and instant grading.</p>
            </div>

            {/* Question Types */}
            <div className="p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 mx-auto mb-6 rounded-full bgg-main flex items-center justify-center text-white font-bold">
                Q
              </div>
              <h3 className="font-semibold text-lg mb-3">
                Multiple Question Types
              </h3>
              <p className="text-sm text-gray-600">
                Support for multiple choice, fill-in-the-gap, and
                structured questions.
              </p>
            </div>

            {/* Admin Setup */}
            <div className="p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 mx-auto mb-6 rounded-full bgg-main flex items-center justify-center text-white font-bold">
                <svg className="h-6 w-6 text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />  <circle cx="12" cy="12" r="3" /></svg>
              </div>
              <h3 className="font-semibold text-lg mb-3">
                Admin Exam Setup
              </h3>
              <p className="text-sm text-gray-600">
                Create exams, set durations, assign courses, and manage
                sessions from one dashboard.
              </p>
            </div>

            {/* Student Registration */}
            <div className="p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 mx-auto mb-6 rounded-full bgg-main flex items-center justify-center text-white font-bold">
                <svg className="h-6 w-6 text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="7" r="4" />  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
              </div>
              <h3 className="font-semibold text-lg mb-3">
                Student & Course Registration
              </h3>
              <p className="text-sm text-gray-600">
                Register students, assign courses, and control who can sit
                for each exam.
              </p>
            </div>

            {/* Advanced Inputs */}
            <div className="p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 mx-auto mb-6 rounded-full bgg-main flex items-center justify-center text-white font-bold">
                ∑
              </div>
              <h3 className="font-semibold text-lg mb-3">
                Advanced Exam Inputs
              </h3>
              <p className="text-sm text-gray-600">
                Add images, math expressions, diagrams, and rich content
                to questions.
              </p>
            </div>

            {/* Secure & Reliable */}
            <div className="p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 mx-auto mb-6 rounded-full bgg-main flex items-center justify-center text-white font-bold">
                <svg className="h-6 w-6 text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="5" y="11" width="14" height="10" rx="2" />  <circle cx="12" cy="16" r="1" />  <path d="M8 11v-4a4 4 0 0 1 8 0v4" /></svg>
              </div>
              <h3 className="font-semibold text-lg mb-3">
                Secure & Reliable
              </h3>
              <p className="text-sm text-gray-600">
                Designed to prevent crashes, leaks, and exam manipulation —
                even at scale.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 px-6 bg-gray-50 font-grotesk">
        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-bold mb-4 fff-main">
            Simple, Transparent Pricing
          </h2>

          <p className="text-gray-600 max-w-xl mx-auto mb-16">
            One powerful plan for schools, training centers, and institutions.
            No hidden fees.
          </p>

          <div className="max-w-md mx-auto bg-white rounded-3xl shadow-lg border border-gray-100 p-10">

            <h3 className="text-xl font-semibold mb-6">JustCBT Standard</h3>

            <div className="mb-6">
              <span className="text-4xl font-bold fff-main">₦10,000</span>
              <span className="text-gray-600"> / month</span>
            </div>

            <div className="w-full h-px bg-gray-200 my-6" />

            <div className="mb-10">
              <span className="text-3xl font-bold fff-main">₦100,000</span>
              <span className="text-gray-600"> / year</span>
              <p className="text-sm text-gray-500 mt-2">Save ₦20,000 when billed yearly</p>
            </div>

            <ul className="text-sm text-gray-700 space-y-3 mb-10 text-left">
              <li>✔ Unlimited CBT exams</li>
              <li>✔ Multiple question types</li>
              <li>✔ Student & course registration</li>
              <li>✔ Image & math-based questions</li>
              <li>✔ Secure exam sessions</li>
            </ul>

            <div className="flex flex-col gap-4">
              <button 
                onClick={() => goToPayment('monthly')} 
                className="w-full py-3 rounded-xl bgg-main text-white font-semibold hover:opacity-90 transition"
              >
                Purchase Now
              </button>

              <button 
                onClick={() => setShowDemo(true)}
                className="w-full py-3 rounded-xl border bdd-main fff-main font-semibold hover:bg-green-50 transition"
              >
                Book a Demo
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-white font-grotesk">
        <div className="max-w-5xl mx-auto">

          
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 fff-main">
            Frequently Asked Questions
          </h2>

          <p className="text-center text-gray-600 mb-16">
            Everything you need to know before getting started.
          </p>

          
          <div className="space-y-8">

            <div className="p-6 rounded-2xl border border-gray-100">
              <h3 className="font-semibold mb-2">
                Is JustCBT suitable for universities and secondary schools?
              </h3>
              <p className="text-gray-600 text-sm">
                Yes. JustCBT is built for universities, polytechnics, colleges,
                secondary schools, and training centers of any size.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-gray-100">
              <h3 className="font-semibold mb-2">
                What types of questions are supported?
              </h3>
              <p className="text-gray-600 text-sm">
                Multiple choice, fill-in-the-gap, structured questions, and rich
                content including images and math expressions.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-gray-100">
              <h3 className="font-semibold mb-2">
                Can students take exams on their own devices?
              </h3>
              <p className="text-gray-600 text-sm">
                Yes. Exams can be taken on computers, tablets, or mobile devices
                with secure session controls.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-gray-100">
              <h3 className="font-semibold mb-2">
                Is my exam data secure?
              </h3>
              <p className="text-gray-600 text-sm">
                Absolutely. JustCBT is designed to prevent leaks, crashes, and
                manipulation, even during large-scale exams.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-gray-100">
              <h3 className="font-semibold mb-2">
                Can I request a demo before paying?
              </h3>
              <p className="text-gray-600 text-sm">
                Yes. You can book a demo to see how JustCBT works before making
                any purchase.
              </p>
            </div>

          </div>
        </div>
      </section>
      

      {/* FOOTER */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8 px-6 font-grotesk">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Left */}
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} JustCBT. All rights reserved.
          </p>

          {/* Right */}
          <div className="flex gap-6 text-sm text-gray-600">
            <a href="#" className="hover:opacity-70">Privacy Policy</a>
            <a href="#" className="hover:opacity-70">Terms of Service</a>
            <a href="#" className="hover:opacity-70">Contact</a>
          </div>

        </div>
      </footer>
    </>
  );
}
