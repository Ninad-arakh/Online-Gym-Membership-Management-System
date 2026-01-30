"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function DashboardLanding() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".animate", {
        opacity: 0,
        y: 50,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={root}
      className="min-h-screen text-white bg-linear-to-br from-[#2b0000] via-[#6d0000] to-black overflow-y-scroll no-scrollbar w-full"
    >
      {/* HERO */}
      <section className="relative px-6 py-24 md:py-32 max-w-7xl mx-auto  md:mt-30 mt-8 h-screen flex flex-col justify-center items-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,0,0,0.15),transparent_60%)] " />
        <h1 className="animate text-4xl md:text-6xl font-extrabold leading-tight">
          Transform Your Body.
          <br />
          <span className="text-red-400">Control Your Fitness.</span>
        </h1>
        <p className="animate mt-6 max-w-2xl text-white/70 text-lg mx-auto">
          A complete gym management and fitness experience designed for
          discipline, performance, and results. Everything you need — one
          powerful platform.
        </p>

        <div className="animate mt-10 flex flex-wrap gap-4 justify-center">
          <button className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 transition shadow-lg shadow-red-600/30">
            Explore Programs
          </button>
          <button className="px-6 py-3 rounded-xl border border-white/20 hover:border-red-500 hover:text-red-400 transition">
            View Memberships
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-20 max-w-7xl mx-auto ">
        <h2 className="animate text-3xl font-bold mb-10">
          Why This Gym Platform Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8 ">
          {[
            {
              title: "Smart Membership Control",
              desc: "Manage plans, renewals, and benefits with absolute clarity and zero friction.",
            },
            {
              title: "Trainer & Class Booking",
              desc: "Schedule sessions, track attendance, and maximize workout efficiency.",
            },
            {
              title: "Performance Tracking",
              desc: "Stay consistent with detailed insights and structured programs.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="animate group p-6 rounded-2xl bg-white/10 backdrop-blur border border-white/10 hover:border-red-500 hover:bg-white/15 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold group-hover:text-red-400 transition">
                {f.title}
              </h3>
              <p className="mt-3 text-white/70">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* IMAGE + TEXT */}
      <section className="px-6 py-20 max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center ">
        <div className="">
          <h2 className="text-3xl font-bold">Built for Serious Training</h2>
          <p className="mt-4 text-white/70">
            This platform isn’t about motivation quotes. It’s about structure,
            accountability, and systems that actually help you show up and
            perform.
          </p>

          <ul className="mt-6 space-y-3 text-white/80 animate-pulse">
            <li>✔ Clean scheduling & planning</li>
            <li>✔ Real progress visibility</li>
            <li>✔ Zero clutter, zero confusion</li>
          </ul>
        </div>

        <div className="animate relative rounded-3xl overflow-hidden shadow-2xl shadow-red-900/40">
          <img
            src="https://images.unsplash.com/photo-1579758629938-03607ccdbaba"
            alt="Gym"
            width={800}
            height={600}
            className="object-cover hover:scale-105 transition duration-500"
          />
        </div>
      </section>

      {/* TESTIMONIALS */}
      {/* <section className="px-6 py-20 max-w-7xl mx-auto">
        {/* <h2 className="animate text-3xl font-bold mb-12">
          Trusted by Dedicated Athletes
        </h2> *

        <div className="grid md:grid-cols-3 gap-8">
          {[
            "This system keeps me consistent. No excuses.",
            "Best gym experience I’ve had — clean and powerful.",
            "Everything is organized. I just train.",
          ].map((t, i) => (
            <div
              key={i}
              className="animate p-6 rounded-2xl bg-black/40 border border-white/10 hover:border-red-500 transition"
            >
              <p className="text-white/80">“{t}”</p>
              <p className="mt-4 text-sm text-white/50">— Gym Member</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* CTA */}
      <section className="px-6 py-24 text-center h-screen flex flex-col justify-center items-center">
        <h2 className="animate text-4xl font-bold">
          Start Training With Purpose
        </h2>
        <p className="animate mt-4 text-white/70 max-w-xl mx-auto">
          This isn’t just a gym system. It’s a commitment to structure,
          progress, and discipline.
        </p>

        <button className="animate mt-8 px-8 py-4 rounded-xl bg-red-600 hover:bg-red-700 transition shadow-xl shadow-red-600/40">
          Get Started Now
        </button>
      </section>
    </main>
  );
}
