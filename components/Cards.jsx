"use client";

import { useEffect, useRef, useState } from "react";
import bgLnading from "@/public/bgLanding2.png";
import muscles from "@/public/popularPlans/muscle.jpg";
import together from "@/public/popularPlans/together.jpg";
import women from "@/public/popularPlans/girls.jpg";
import gsap from "gsap";
import Image from "next/image";
import Lenis from "lenis";
import Link from "next/link";
import img1 from "@/public/Carousel/1.jpg";
import img2 from "@/public/Carousel/2.jpg";
import img3 from "@/public/Carousel/3.jpg";
import img4 from "@/public/Carousel/4.jpg";
import img5 from "@/public/Carousel/5.jpg";
import img6 from "@/public/Carousel/6.jpg";
import img7 from "@/public/Carousel/7.jpg";
import img8 from "@/public/Carousel/8.jpg";
import img9 from "@/public/Carousel/9.jpg";
import WhyChooseUs from "./WhyChooseUs";

export default function DashboardLanding() {
  const root = useRef(null);

  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 3) % images.length);
    }, 3000); // Auto-scroll every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Change image on button click
  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 3 + images.length) % images.length,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3) % images.length);
  };

  // useEffect(() => {
  //   const lenis = new Lenis({
  //     duration: 1.1,
  //     smoothWheel: true,
  //     smoothTouch: false,
  //   });

  //   let rafId;

  //   const raf = (time) => {
  //     lenis.raf(time);
  //     rafId = requestAnimationFrame(raf);
  //   };

  //   rafId = requestAnimationFrame(raf);

  //   return () => {
  //     cancelAnimationFrame(rafId);
  //     lenis.destroy();
  //   };
  // }, []);

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
      className=" overflow-y-scroll no-scrollbar w-full relative"
    >
      {/* HERO */}
      <section className="relative px-6 py-24 md:py-32 gap-8 mx-auto bg-linear-to-br from-[#f1f0f8] via-[#eeccf7]/20 to-[#fccbc0]/20 md:mt-30 mt-8 min-h-screen flex flex-col justify-center items-center">
        <div className="">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,0,0,0.15),transparent_60%)]/80 " />
          <h1 className="animate text-4xl md:text-6xl font-extrabold leading-tight text-[#312D3F]">
            Transform Your Body.
            <br />
            <span className="text-red-400">Control Your Fitness.</span>
          </h1>
          <p className="animate mt-6 max-w-2xl text-[#312D3F] text-lg mx-auto">
            A complete gym management and fitness experience designed for
            discipline, performance, and results. Everything you need — one
            powerful platform.
          </p>

          <div className="animate mt-10 flex flex-wrap gap-4 justify-center">
            <Link href={"/membership/plan"}>
              <button className="px-6 py-3 rounded-xl text-white bg-red-600 hover:bg-red-700 transition shadow-lg shadow-red-600/30">
                View Memberships
              </button>
            </Link>
          </div>
        </div>

        <div className="relative md:w-10/12 w-full mx-auto overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-1000 ease-in-out gap-2 mx-4"
            style={{ transform: `translateX(-${(currentIndex / 3) * 33.33}%)` }}
          >
            {images.map((img, index) => (
              <div key={index} className="md:w-1/3 shrink-0 rounded-xl">
                <Image
                  src={img}
                  alt={`carousel image ${index + 1}`}
                  className="w-full md:h-full h-50 object-cover rounded-xl"
                />
              </div>
            ))}
          </div>

          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-2 rounded-full text-white"
          >
            &#10094;
          </button>

          <button
            onClick={handleNext}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 p-2 rounded-full text-white"
          >
            &#10095;
          </button>
        </div>
      </section>

      <WhyChooseUs />

      {/* At center  */}
      <section className="w-full min-h-screen mt- py-20 flex flex-col gap-10 justify-center bg-linear-to-br from-[#f1f0f8] via-[#eeccf7]/20 to-[#fccbc0]/20">
        <div className=" flex gap-3 flex-col justify-center items-center">
          <h4 className="text-2xl text-[#312D3F]">At Center</h4>
          <h2 className="text-5xl  font-semibold text-[#312D3F]">
            Trainer-led Group Classes
          </h2>
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

      {/* <section className="flex flex-col justify-center gap-8 w-full mx-auto min-h-screen mt- bg-linear-to-br from-[#f1f0f8] via-[#eeccf7]/20 to-[#fccbc0]/20">
            {/* popular programs
        <div className="justify-between flex">
          <h2 className="text-5xl text-[#312D3F]">Popular Programs</h2>
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
      </section> */}

      {/* IMAGE + TEXT */}
      <section className="md:px-20 px-2 py-20 max-w-7x w-full mx-auto grid md:grid-cols-2 gap-14 items-center  bg-linear-to-br from-[#f1f0f8] via-[#eeccf7]/20 to-[#fccbc0]/20">
        <div className="">
          <h2 className="text-3xl font-bold text-[#312D3F]">
            Built for Serious Training
          </h2>
          <p className="mt-4 text-[#312D3F]">
            This platform isn’t about motivation quotes. It’s about structure,
            accountability, and systems that actually help you show up and
            perform.
          </p>

          <ul className="mt-6 space-y-3 text-[#312D3F] animate-pulse">
            <li>✔ Clean scheduling & planning</li>
            <li>✔ Real progress visibility</li>
            <li>✔ Zero clutter, zero confusion</li>
          </ul>

          <Link href={"/membership/plan"}>
            <button className="mt-6 px-6 py-3 rounded-xl border border-red-500 text-red-400 transition-all duration-300">
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
    </main>
  );
}
