"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Cards from "./Cards";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const MemberDashboard = ({ user }) => {
  const [membership, setMembership] = useState(null);
  const [loading, setLoading] = useState(true);

  const containerRef = useRef(null);

  useEffect(() => {
    const fetchMembership = async () => {
      try {
        const { data } = await axios.get("/api/membership/me", {
          withCredentials: true,
        });
        setMembership(data.membership);
      } catch (err) {
        console.error("error : ", err);
        setMembership(null);
      } finally {
        setLoading(false);
      }
    };
    fetchMembership();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-animate", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
      });

      gsap.from(".card-animate", {
        scrollTrigger: {
          trigger: ".card-animate",
          start: "top 85%",
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (loading) return null;

  /* ---------------- NO MEMBERSHIP ---------------- */
  if (!membership) {
    return (
      <div className="flex flex-col items-center justify-center -mt-32 text-center w-full">
        <Cards />
      </div>
    );
  }

  /* ---------------- MEMBERSHIP PRESENT ---------------- */
  const endDate = new Date(membership.endDate);
  const daysLeft = Math.ceil((endDate - new Date()) / (1000 * 60 * 60 * 24));

  const isActive = membership.status === "active";
  const isTrial = membership.isTrial;

  return (
    <div
      ref={containerRef}
      className="w-full mx-auto flex flex-col gap-12 pt-12 pb-20 overflow-y-scroll bg-linear-to-br from-[#f9e9f4] to-[#d5e6fc]"
    >
      <div className="w-full mx-2 flex flex-col gap-12 sm:max-w-7xl sm:mx-auto">
        {/* Greeting */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#312D3F]">
            Welcome back, {user.name}
          </h1>
          <p className="mt-2 text-[#6B657A]">
            Here’s a quick overview of your fitness journey
          </p>
        </div>

        {/* Membership Card */}
        <div
          className="hero-animate rounded-3xl bg-white/80 backdrop-blur-xl border border-black/5 shadow-xl p-8 bg-linear-to-br from-[#fff9fe] via-[#fdf1fc] to-[#fee3da]/70
  transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-[#312D3F]">
                {membership.planTitle}
              </h2>
              <p className="mt-1 text-sm text-[#6B657A] capitalize">
                {membership.billingCycle} billing
              </p>
              <p className="mt-4 text-sm text-[#6B657A]">
                Ends on{" "}
                <span className="font-medium text-[#312D3F]">
                  {endDate.toDateString()}
                </span>
              </p>
            </div>

            <div className="md:text-right flex flex-col items-start md:items-end gap-3">
              <span
                className={`px-4 py-1 rounded-full text-xs font-semibold ${
                  isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {isTrial ? "TRIAL" : membership.status.toUpperCase()}
              </span>

              <p className="text-3xl font-bold text-[#312D3F]">
                {daysLeft} days left
              </p>

              <p className="text-sm text-[#6B657A]">
                ₹{membership.pricePaid} paid
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              disabled
              className="px-10 py-3 rounded-xl bg-red-500 text-white font-medium opacity-60 cursor-not-allowed shadow-lg"
            >
              Manage Membership
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            ["Plan Type", membership.planTitle],
            ["Billing", membership.billingCycle],
            ["Access Level", membership.planSlug.toUpperCase()],
            ["Support", "Standard Gym Support"],
          ].map(([label, value], i) => (
            <div
              key={i}
              className="card-animate rounded-2xl bg-linear-to-br from-[#fcf7f5] via-[#fdf1fc] to-[#fdf1fc] backdrop-blur border border-black/5 p-5 text-center shadow-xl
  transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:scale-[1.02]"
            >
              <p className="text-sm text-[#6B657A]">{label}</p>
              <p className="mt-2 font-semibold text-[#312D3F]">{value}</p>
            </div>
          ))}
        </div>

        {/* What You Get */}
        <div className="rounded-3xl bg-white/70 backdrop-blur border border-black/5 p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <h3 className="text-xl font-semibold text-[#312D3F] mb-4">
            Your Membership Includes
          </h3>

          <ul className="grid md:grid-cols-2 gap-3 text-[#4A4658]">
            <li>✔ Full gym access during operating hours</li>
            <li>✔ Personalized workout recommendations</li>
            <li>✔ Progress & attendance tracking</li>
            <li>✔ Priority equipment access (peak hours)</li>
            <li>✔ Trainer support based on plan</li>
            <li>✔ Clean, distraction-free training environment</li>
          </ul>
        </div>

        {/* Trainer Info */}
        {["pro", "elite"].includes(membership.planSlug) && (
          <div className="rounded-3xl bg-white/70 backdrop-blur border border-black/5 p-6 shadow  shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" >
            <h3 className="text-lg font-semibold text-[#312D3F] mb-2">
              Personal Trainer
            </h3>

            {membership.trainerId ? (
              <p className="text-green-600 font-medium">
                Assigned to {membership.trainerId.name}
              </p>
            ) : (
              <p className="text-yellow-600 font-medium">
                No trainer assigned yet
              </p>
            )}
          </div>
        )}

        {/* Guidance */}
        <div className="rounded-3xl bg-linear-to-br border-2 border-white/50 from-[#f1f0f8] via-[#eeccf7]/30 to-[#fccbc0]/30 p-10  shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <h3 className="text-xl font-semibold text-[#312D3F] mb-3">
            Training Guidance
          </h3>
          <p className="text-[#4A4658] max-w-3xl">
            Consistency beats intensity. Stick to your plan, track progress
            weekly, and focus on form before increasing weights. This platform
            is built to support discipline — results follow naturally.
          </p>
        </div>

        {/* Next Steps */}
        <div className="rounded-3xl bg-white/80 backdrop-blur border border-black/5 p-8  shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <h3 className="text-xl font-semibold text-[#312D3F] mb-4">
            Recommended Next Steps
          </h3>

          <ol className="list-decimal list-inside space-y-2 text-[#4A4658]">
            <li>Visit the gym and complete your first session</li>
            <li>Speak to the front desk about trainer availability</li>
            <li>Set a weekly workout schedule</li>
            <li>Track consistency instead of perfection</li>
          </ol>
        </div>

        {/* ===================== WEEKLY STRUCTURE ===================== */}
        <div className="rounded-3xl bg-white/70 backdrop-blur border border-black/5 p-10  shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <h3 className="text-2xl font-semibold text-[#312D3F] mb-6">
            Suggested Weekly Training Structure
          </h3>

          <div className="grid md:grid-cols-2 gap-6 text-[#4A4658]">
            <div>
              <h4 className="font-semibold mb-2">Strength Days</h4>
              <p>
                Focus on compound lifts. Progressive overload. Rest properly
                between sets. These days build the foundation of your physique.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Conditioning Days</h4>
              <p>
                Cardio, circuits, mobility. Improve endurance and recovery
                without burning out your CNS.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Recovery Day</h4>
              <p>
                Light movement, stretching, hydration. Recovery is not optional
                — it’s part of progress.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Optional Skill Work</h4>
              <p>
                Form correction, tempo control, balance. Small details compound
                over months.
              </p>
            </div>
          </div>
        </div>

        {/* ===================== TRAINING PHILOSOPHY ===================== */}
        <div className="rounded-3xl bg-linear-to-br border-2 border-white/50 from-[#f1f0f8] via-[#eeccf7]/30 to-[#fccbc0]/30 p-10  shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <h3 className="text-2xl font-semibold text-[#312D3F] mb-4">
            Training Philosophy
          </h3>
          <p className="text-[#4A4658] max-w-4xl leading-relaxed">
            This gym is built around structure, not hype. You won’t find
            shortcuts, detox gimmicks, or overnight promises here. What you will
            find is a system that rewards consistency, patience, and effort.
            <br />
            <br />
            Train hard. Recover properly. Repeat for months. That’s how bodies
            change.
          </p>
        </div>

        {/* ===================== GYM ETIQUETTE ===================== */}
        <div className="rounded-3xl bg-white/80 backdrop-blur border border-black/5 p-10  shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <h3 className="text-2xl font-semibold text-[#312D3F] mb-6">
            Gym Etiquette & Expectations
          </h3>

          <ul className="space-y-3 text-[#4A4658]">
            <li>• Re-rack weights after use</li>
            <li>• Wipe equipment after training</li>
            <li>• Respect personal space</li>
            <li>• Phones off during heavy lifts</li>
            <li>• Ask trainers when unsure — guessing causes injuries</li>
          </ul>
        </div>

        {/* ===================== RECOVERY & NUTRITION ===================== */}
        <div className="rounded-3xl bg-white/70 backdrop-blur border border-black/5 p-10  shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <h3 className="text-2xl font-semibold text-[#312D3F] mb-4">
            Recovery & Nutrition Basics
          </h3>

          <div className="space-y-4 text-[#4A4658] max-w-4xl">
            <p>
              Training breaks muscle. Nutrition and sleep rebuild it. Ignore
              either and progress stalls.
            </p>
            <p>
              Focus on protein intake, hydration, and sleep consistency before
              chasing supplements.
            </p>
            <p>Supplements enhance discipline — they don’t replace it.</p>
          </div>
        </div>

        {/* ===================== FAQs ===================== */}
        <div className="rounded-3xl bg-white/80 backdrop-blur border border-black/5 p-10  shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <h3 className="text-2xl font-semibold text-[#312D3F] mb-6">
            Frequently Asked Questions
          </h3>

          <div className="space-y-5 text-[#4A4658]">
            <div>
              <h4 className="font-semibold">How often should I train?</h4>
              <p>3–5 sessions per week depending on recovery and goals.</p>
            </div>

            <div>
              <h4 className="font-semibold">When will I see results?</h4>
              <p>Strength improves in weeks. Visible changes take months.</p>
            </div>

            <div>
              <h4 className="font-semibold">Can beginners lift heavy?</h4>
              <p>Yes — with correct form and supervision.</p>
            </div>
          </div>
        </div>

        {/* ===================== SAFETY NOTICE ===================== */}
        <div className="rounded-3xl bg-yellow-50 border border-yellow-200 p-10">
          <h3 className="text-xl font-semibold text-yellow-800 mb-3">
            Safety Notice
          </h3>
          <p className="text-yellow-700 max-w-4xl tracking-tighter leading-tight">
            Always warm up before sessions. Stop training immediately if you
            feel sharp pain, dizziness, or discomfort. Consult a professional
            before starting any intense program.
          </p>
        </div>

        {/* ===================== LONG-TERM MINDSET ===================== */}
        <div className="rounded-3xl bg-linear-to-br from-[#312D3F] tracking-tighter leading-tight to-[#1f1c29] p-12 text-white">
          <h3 className="text-2xl font-semibold mb-4">Long-Term Mindset</h3>
          <p className="max-w-4xl leading-relaxed text-white/80">
            Fitness is not a phase. It’s a lifestyle built quietly through
            repetition. The goal is not motivation — it’s identity. Become
            someone who trains. Everything else follows.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
