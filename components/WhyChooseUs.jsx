"use client"
import React from "react";

const WhyChooseUs = () => {
  return (
    <section className="flex flex-col justify-center gap-8 w-full mx-auto min-h-screen mt- bg-linear-to-br from-[#f1f0f8] via-[#eeccf7]/20 to-[#fccbc0]/20">
      <div className="md:w-8/12 mx-auto flex flex-col gap-4">
        <h2 className="font-semibold text-4xl tracking-tighter">
          WHY CHOOSE CREATIVITY FITNESS GYM MEMBERSHIP
        </h2>
        <div className="md:grid grid-cols-2 gap-6 px-10 mt-5">
          <div className="flex flex-col gap-3 border rounded-xl p-5 hover:shadow-lg transition-all duration-300">
            <img
              src="https://www.anytimefitness.co.in/wp-content/uploads/2021/12/brand-refresh-why-af-support-1.webp"
              className="w-30 mx-auto"
              alt="feature1"
            />
            <h4 className="font-semibold text-2xl">Support</h4>
            <p className=" text-left">
              Creativity Fitness offers comprehensive support to all gym
              members. From personalized training to regular guidance, our
              certified trainers are here to assist you in fulfilling your
              fitness goals. It is the perfect place for starting a journey
              towards a healthy lifestyle.
            </p>
          </div>
          <div className="flex flex-col gap-3 border rounded-xl p-5 hover:shadow-lg transition-all duration-300">
            <img
              src="https://www.anytimefitness.co.in/wp-content/uploads/2021/12/brand-refresh-why-af-tools-and-training-1.webp"
              className="w-30 mx-auto"
              alt="feature1"
            />

            <h4 className="font-semibold text-2xl">Tools & Training</h4>
            <p className=" text-left">
              With avant-garde equipment incorporating cardio machines, free
              weights, and strength training, you’ll get everything you need to
              pursue a balanced workout routine. Anytime Fitness has dedicated
              space for group classes, functional training, and personal
              training ensuring that there’s something for everyone.
            </p>
          </div>
          <div className="flex flex-col gap-3 border rounded-xl p-5 hover:shadow-lg transition-all duration-300">
            <img
              src="https://www.anytimefitness.co.in/wp-content/uploads/2021/12/brand-refresh-why-af-convenience-1.webp"
              className="w-30 mx-auto"
              alt="feature1"
            />

            <h4 className="font-semibold text-2xl">Convenience</h4>
            <p className=" text-left">
              With Anytime Fitness, get convenient 24/7 access to more than
              5000+ locations worldwide and approximately 150+ clubs in India.
              Get an Anytime Fitness gym membership and experience the
              difference it brings for you.
            </p>
          </div>
          <div className="flex flex-col gap-3 border rounded-xl p-5 hover:shadow-lg transition-all duration-300">
            <img
              src="https://www.anytimefitness.co.in/wp-content/uploads/2021/12/brand-refresh-why-af-community-1.webp"
              className="w-30 mx-auto"
              alt="feature1"
            />

            <h4 className="font-semibold text-2xl">Community</h4>
            <p className=" text-left">
              Anytime Fitness is not just a gym- it’s a supportive community of
              like-minded individuals who are here to give you motivation
              whenever you need it. We encourage every member to exchange tips
              and encouragement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
