"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const hide = () => {
      timeoutId = setTimeout(() => setShow(false), 400);
    };

    const minDisplay = setTimeout(() => {
      hide();
    }, 1000);

    if (document.readyState === "complete") {
      hide();
    } else {
      window.addEventListener("load", hide, { once: true });
    }

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(minDisplay);
      window.removeEventListener("load", hide);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-[var(--background)]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-primary/20 bg-white/65 shadow-inner-glow backdrop-blur-md dark:border-accent/30 dark:bg-surface-muted/80">
            <motion.span
              className="absolute inset-3 rounded-full border-2 border-dashed border-primary/70 dark:border-accent/60"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
            />
            <motion.span
              className="absolute inset-5 rounded-full border border-primary/30 dark:border-accent/30"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
            />
            <motion.div
              className="relative flex flex-col items-center gap-1 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-sm font-semibold text-primary dark:text-accent">
                ویزیت خودرو
              </span>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-300">
                در حال بارگذاری...
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
