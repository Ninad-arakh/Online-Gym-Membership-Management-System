"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";

export default function ExpandableCardDemo({ cards, isRequestTrainers = true }) {
  const [active, setActive] = useState(null);
  const ref = useRef(null);
  const id = useId();

  useEffect(() => {
    if (active) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Expanded Card */}
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 z-50 grid place-items-center px-4 ">
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-xl rounded-3xl bg-neutral-900 text-white shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <h2 className="text-2xl font-bold uppercase">{active.title}</h2>
                <p className="text-sm text-neutral-400">
                  {active.description}
                </p>
              </div>

              {/* Content */}
              <div className="p-6 space-y-5">
                {active.content}
              </div>

              {/* CTA */}
              {isRequestTrainers && <div className="p-6 border-t border-white/10 flex justify-end">
                <button
                  onClick={active.onAction}
                  className="rounded-xl bg-red-600 px-6 py-2 font-semibold hover:bg-red-700 transition"
                >
                  Request Trainer
                </button>
              </div>}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* List */}
      <div className="grid gap-6 md:w-155  ">
        {cards.map((card) => (
          <motion.div
            key={card.title}
            layoutId={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="cursor-pointer rounded-xl bg-white/5 hover:bg-white/10 transition p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-white uppercase text-3xl">{card.title}</h3>
              <p className="text-sm text-neutral-400 md:text-xl">{card.description}</p>
            </div>

            <span className="text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-400">
              Available
            </span>
          </motion.div>
        ))}
      </div>
    </>
  );
}
