"use client";

import { useEffect, useRef } from "react";
import bgLnading from "@/public/bgLanding2.png";
import muscles from "@/public/popularPlans/muscle.jpg";
import together from "@/public/popularPlans/together.jpg";
import women from "@/public/popularPlans/girls.jpg";
import gsap from "gsap";
import Image from "next/image";
import Lenis from "lenis";
import Link from "next/link";

export default function DashboardLanding() {
  const root = useRef(null);

  // useEffect(() =>{
  //   const lenis = new Lenis({
  //     duration: 1
  //   })

  //   const raf = (time) => {
  //     lenis.raf(time)
  //     requestAnimationFrame(raf)
  //   }

  //   requestAnimationFrame(raf)

  //   // return () => {
  //   //   lenis.destroy()
  //   // }
  // },[])

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
      className="min-h-screen text-white bg-linear-to-br from-[#2b0000] via-[#6d0000] to-black overflow-y-scroll no-scrollbar w-full relative"
    >
      {/* <section className="relative w-full h-screen"></section> */}
      <Image
        src={bgLnading}
        alt="bgImage"
        className="absolute inset-0 bg-cover mt-32 h-screen "
      />
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
          {/* <button className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 transition shadow-lg shadow-red-600/30">
            Explore Programs
          </button> */}
          <Link href={"/membership/plan"}>
            <button className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 transition shadow-lg shadow-red-600/30">
              View Memberships
            </button>
          </Link>
          {/* <Link href={""} ><button className="px-6 py-3 rounded-xl border border-white/20 hover:border-red-500 hover:text-red-400 transition">
            View Memberships
          </button></Link> */}
        </div>
      </section>

      {/* At center  */}
      <section className="w-full min-h-screen mt-2 py-20 flex flex-col gap-10 justify-center">
        <div className=" flex gap-3 flex-col justify-center items-center">
          <h4 className="text-2xl">At Center</h4>
          <h2 className="text-5xl  font-semibold">Trainer-led Group Classes</h2>
        </div>
        <div className=" w-7/12 mx-auto flex justify-center items-center gap-8">
          <img
            src="https://cdn-images.cure.fit/www-curefit-com/image/upload/w_300,q_auto:good,f_auto,dpr_2,fl_progressive/image/vm/a5a782ac-9fcd-44e5-8bc0-3a8780dc5ebd.png"
            alt="image1"
            className="w-70 rounded-xl hover:scale-110 hover:drop-shadow-2xl duration-300 transition-all bg-linear-to-r from-[#1d2f3b] to-[#16181e]"
          />
          <img
            src="https://cdn-images.cure.fit/www-curefit-com/image/upload/w_300,q_auto:good,f_auto,dpr_2,fl_progressive/image/vm/f0ca709e-913d-4422-a90c-8bc9ef2be733.png"
            alt="image1"
            className="w-70 rounded-xl hover:scale-110 hover:drop-shadow-2xl duration-300 transition-all bg-linear-to-r from-[#1d2f3b] to-[#16181e]"
          />
          <img
            src="https://cdn-images.cure.fit/www-curefit-com/image/upload/w_300,q_auto:good,f_auto,dpr_2,fl_progressive/image/vm/7bf136db-7217-4733-af9f-1bb8a4155a83.png"
            alt="image1"
            className="w-70 rounded-xl hover:scale-110 hover:drop-shadow-2xl duration-300 transition-all bg-linear-to-r from-[#1d2f3b] to-[#16181e]"
          />
          <img
            src="https://cdn-images.cure.fit/www-curefit-com/image/upload/w_300,q_auto:good,f_auto,dpr_2,fl_progressive/image/vm/70616b89-0271-49e4-b22d-5752599023a4.jpeg"
            alt="image1"
            className="w-70 rounded-xl hover:scale-110 hover:drop-shadow-2xl duration-300 transition-all bg-linear-to-r from-[#1d2f3b] to-[#16181e]"
          />
        </div>
      </section>

      {/* popular plans  */}
      <section className="flex flex-col justify-center gap-8 w-9/12 mx-auto min-h-screen mt-2">
        <div className="justify-between flex">
          <h2 className="text-5xl">Popular Programs</h2>
          {/* <h2>Popular Programs</h2> */}
        </div>
        <div className="flex gap-4 items-center">
          <div className="w-4/12 group h-[50vh] rounded-xl relative overflow-hidden hover:scale-105 duration-300 ease-in-out">
            <Image
              src={together}
              alt="popularPlanImage"
              className="w-full h-full bg-cover absolute "
            />
            <div className=" z-10 px-4 py-14 bg-linear-to-b  from-red-600/0 to-slate-700 absolute bottom-0 hidden group-hover:block duration-200 transition-all items-center w-full">
              <h2 className="text-3xl font-semibold uppercase">
                Strength Training
              </h2>
              <p></p>
            </div>
          </div>
          <div className="w-4/12 group h-[50vh] rounded-xl relative overflow-hidden hover:scale-105 duration-300 ease-in-out">
            <Image
              src={women}
              alt="popularPlanImage"
              className="w-full h-full bg-cover absolute "
            />
            <div className=" z-10 px-4 py-14 bg-linear-to-b  from-red-600/0 to-slate-700 absolute bottom-0 hidden group-hover:block duration-200 transition-all items-center w-full">
              <h2 className="text-3xl font-semibold uppercase">
                Fat Loss Intensive
              </h2>
              <p></p>
            </div>
          </div>
          <div className="w-4/12 group h-[50vh] rounded-xl relative overflow-hidden hover:scale-105 duration-300 ease-in-out">
            <Image
              src={muscles}
              alt="popularPlanImage"
              className="w-full h-full bg-cover absolute "
            />
            <div className=" z-10 px-4 py-14 bg-linear-to-b  from-red-600/0 to-slate-700 absolute bottom-0 hidden group-hover:block duration-200 transition-all items-center w-full">
              <h2 className="text-3xl font-semibold uppercase">
                Muscle Building
              </h2>
              <p></p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      {/* <section className="px-6 py-20 max-w-7xl mx-auto ">
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
      </section> */}

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

          <Link href={"/membership/plan"}>
            <button className="mt-6 px-6 py-3 rounded-xl border border-white/20 hover:border-red-500 hover:text-red-400 transition">
              View Memberships
            </button>
          </Link>
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
      {/* <section className="px-6 py-24 text-center h-screen flex flex-col justify-center items-center">
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
      </section> */}
    </main>
  );
}
