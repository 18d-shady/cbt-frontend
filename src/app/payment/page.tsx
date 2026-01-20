"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { checkSchool, requestSchool, startSubscription } from "@/lib/school";

type Plan = "trial" | "monthly" | "yearly";

function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // 1. Plan State (Initialized from URL, but changeable)
  const [plan, setPlan] = useState<Plan>((searchParams.get("plan") as Plan) || "monthly");
  
  // 2. Form & Flow State
  const [hasSchool, setHasSchool] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [schoolName, setSchoolName] = useState<string | null>(null);
  const [schoolExists, setSchoolExists] = useState<boolean | null>(null);

  // 3. UI State
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheckSchool = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!email) {
        setError("Please enter your school email");
        return;
      }
      const data = await checkSchool(email);
      if (data.exists) {
        setSchoolExists(true);
        setSchoolName(data.school_name);
      } else {
        setSchoolExists(false);
      }
    } catch {
      setError("Unable to verify school. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleStartSubscription = async () => {
    setLoading(true);
    setError(null);

    try {
        if (!email) {
            setError("Please enter your school email");
            return;
        }
        const data = await startSubscription({ email, plan });

        // TRIAL
        if (plan === "trial") {
            if (data.error) {
                setError(data.error);
                return;
            }

            setMessage("🎉 Trial activated! Redirecting...");
            //setTimeout(() => router.push("/dashboard"), 2000);
            setTimeout(() => {
              window.location.href = "https://davisolehi.pythonanywhere.com/admin/";
            }, 2000);
            return;
        }

        // PAID
        if (data.data?.authorization_url) {
            window.location.href = data.data.authorization_url;
            return;
        }

        // FALLBACK
        setError(data.error || "Could not initialize payment.");

    } catch (err: any) {
        setError(
            err.response?.data?.error ||
            "Network error. Please try again."
        );
    } finally {
        setLoading(false);
    }
    };


  const handleRequestNewSchool = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!email) {
        setError("Please enter your school email");
        return;
      }
      await requestSchool({ email, phone });
      setMessage("✅ Request sent! We will contact you to set up your school.");
    } catch {
      setError("Failed to submit request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-gray-50 font-grotesk">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-8 space-y-6">
        
        {/* PLAN SELECTOR */}
        <div className="text-center">
          <h1 className="text-2xl font-bold fff-main">Setup Your Subscription</h1>
          <div className="flex bg-gray-100 p-1 rounded-xl mt-4">
            {(['trial', 'monthly', 'yearly'] as Plan[]).map((p) => (
              <button
                key={p}
                onClick={() => setPlan(p)}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${
                  plan === p ? "bg-white shadow-sm text-green-600" : "text-gray-500"
                }`}
              >
                {p.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="h-px bg-gray-100 w-full" />

        {/* STEP 1: INITIAL QUESTION */}
        {hasSchool === null && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
            <p className="text-center text-gray-600">Do you already have a school registered on JustCBT?</p>
            <button onClick={() => setHasSchool(true)} className="w-full py-3 rounded-xl bgg-main text-white font-semibold">Yes, I have an account</button>
            <button onClick={() => setHasSchool(false)} className="w-full py-3 rounded-xl border border-gray-300 font-semibold">No, I'm new here</button>
          </div>
        )}

        {/* STEP 2A: CHECK EXISTING SCHOOL */}
        {hasSchool === true && (
          <div className="space-y-4 animate-in fade-in">
            <label className="text-xs font-bold text-gray-400 uppercase">School Admin Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@school.com"
              className="w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-green-500"
            />
            {!schoolExists && (
              <button onClick={handleCheckSchool} disabled={loading} className="w-full py-4 rounded-xl bgg-main text-white font-bold">
                {loading ? "Verifying..." : "Verify School Email"}
              </button>
            )}

            {schoolExists && (
              <div className="p-4 bg-green-50 rounded-xl border border-green-100 text-center">
                <p className="text-green-700 font-bold mb-4">Found: {schoolName}</p>
                <button onClick={handleStartSubscription} disabled={loading} className="w-full py-4 rounded-xl bgg-main text-white font-bold">
                  {loading ? "Processing..." : plan === 'trial' ? "Activate Trial" : "Pay Now"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 2B: REQUEST NEW SCHOOL */}
        {hasSchool === false && (
          <div className="space-y-4 animate-in fade-in">
            <p className="text-sm text-gray-500 text-center">Enter your details and we will create your school dashboard for you.</p>
            <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-4 border rounded-xl" />
            <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-4 border rounded-xl" />
            <button onClick={handleRequestNewSchool} disabled={loading} className="w-full py-4 rounded-xl bgg-main text-white font-bold">
              {loading ? "Sending..." : "Request School Setup"}
            </button>
          </div>
        )}

        {/* MESSAGES */}
        {message && <div className="p-4 bg-green-100 text-green-700 rounded-xl text-center font-medium">{message}</div>}
        {error && <div className="p-4 bg-red-100 text-red-700 rounded-xl text-center font-medium">{error}</div>}
        
        {hasSchool !== null && (
            <button onClick={() => {setHasSchool(null); setSchoolExists(null)}} className="w-full text-center text-xs text-gray-400 hover:text-gray-600">
              ← Go Back
            </button>
        )}
      </div>
    </main>
  );
}

// Wrap in Suspense because of useSearchParams
export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <PaymentContent />
    </Suspense>
  );
}