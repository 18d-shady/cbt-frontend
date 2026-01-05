import Image from "next/image";

export default function HomePage() {
  return (
    <>
      {/* NAVBAR */}
      <nav className="w-full px-8 py-5 flex items-center justify-between font-grotesk">
        <h1 className="text-xl font-bold fff-main">JustCBT</h1>

        <div className="flex gap-8 text-sm font-medium">
          <a href="#features" className="hover:opacity-70">Features</a>
          <a href="#pricing" className="hover:opacity-70">Pricing</a>
          <a href="#main" className="hover:opacity-70">Purchase</a>
        </div>
      </nav>

      {/* HERO */}
      <main className="relative min-h-[calc(100vh-80px)] flex items-center justify-center px-6 font-grotesk overflow-hidden">

        {/* LIGHT GREEN GRADIENT BACKGROUND */}
        <div className="absolute inset-0 bg-gradient-to-br 
                        from-green-50 via-white to-green-100 opacity-80" />

        {/* CONTENT */}
        <div id="main" className="relative max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          
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
              <button className="font-semibold underline underline-offset-4 fff-main">
                Book a Demo
              </button>

              <button className="font-semibold underline underline-offset-4 fff-main">
                Start Free Trial
              </button>
            </div>
          </div>

          {/* RIGHT — IMAGE + SHAPE */}
          <div className="relative w-full h-[520px] flex items-center justify-center animate-float">
            
            {/* Green shapeless background */}
            <div className="absolute w-[480px] h-[480px] bgg-main opacity-90
                            rounded-[60%_40%_70%_30%/40%_60%_40%_60%]" />

            {/* Image */}
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

          {/* Section title */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4 fff-main">
            Built for Modern CBT Exams
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mb-16">
            Everything you need to create, manage, and deliver secure
            computer-based tests — from setup to results.
          </p>

          {/* Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

            {/* CBT Exams */}
            <div className="p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 mx-auto mb-6 rounded-full bgg-main flex items-center justify-center text-white font-bold">
                CBT
              </div>
              <h3 className="font-semibold text-lg mb-3">
                Computer-Based Tests
              </h3>
              <p className="text-sm text-gray-600">
                Deliver secure, timed CBT exams with automatic submission
                and instant grading.
              </p>
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
                ⚙
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
                👤
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
                🔒
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

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4 fff-main">
            Simple, Transparent Pricing
          </h2>

          <p className="text-gray-600 max-w-xl mx-auto mb-16">
            One powerful plan for schools, training centers, and institutions.
            No hidden fees.
          </p>

          {/* Pricing Card */}
          <div className="max-w-md mx-auto bg-white rounded-3xl shadow-lg border border-gray-100 p-10">

            {/* Plan name */}
            <h3 className="text-xl font-semibold mb-6">
              JustCBT Standard
            </h3>

            {/* Monthly price */}
            <div className="mb-6">
              <span className="text-4xl font-bold fff-main">₦10,000</span>
              <span className="text-gray-600"> / month</span>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gray-200 my-6" />

            {/* Yearly price */}
            <div className="mb-10">
              <span className="text-3xl font-bold fff-main">₦100,000</span>
              <span className="text-gray-600"> / year</span>
              <p className="text-sm text-gray-500 mt-2">
                Save ₦20,000 when billed yearly
              </p>
            </div>

            {/* Features list */}
            <ul className="text-sm text-gray-700 space-y-3 mb-10 text-left">
              <li>✔ Unlimited CBT exams</li>
              <li>✔ Multiple question types</li>
              <li>✔ Student & course registration</li>
              <li>✔ Image & math-based questions</li>
              <li>✔ Secure exam sessions</li>
            </ul>

            {/* Actions */}
            <div className="flex flex-col gap-4">
              <button className="w-full py-3 rounded-xl bgg-main text-white font-semibold hover:opacity-90 transition">
                Purchase Now
              </button>

              <button className="w-full py-3 rounded-xl border bdd-main fff-main font-semibold hover:bg-green-50 transition">
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
