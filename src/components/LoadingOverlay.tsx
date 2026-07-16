import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profileData } from "../data/profile";
import { useReducedMotion } from "../utils/useReducedMotion";

/** Sequence length before outro — keeps the reveal intentional (~2s total with exit). */
const MIN_DISPLAY_MS = 1800;
const MAX_DISPLAY_MS = 4000;
const EXIT_DURATION_S = 0.55;
const REDUCED_EXIT_S = 0.2;

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_THEME = [0.4, 0, 0.2, 1] as const;

const getInitials = (name: string): string =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

type UiFragment = {
  id: string;
  className: string;
  delay: number;
  kind: "card" | "browser" | "code";
};

const DESKTOP_FRAGMENTS: UiFragment[] = [
  {
    id: "card-tl",
    kind: "card",
    delay: 0.35,
    className:
      "hidden sm:block absolute top-[14%] left-[6%] md:left-[10%] w-36 md:w-44 -rotate-6",
  },
  {
    id: "browser-tr",
    kind: "browser",
    delay: 0.45,
    className:
      "hidden md:block absolute top-[16%] right-[8%] w-44 lg:w-52 rotate-3",
  },
  {
    id: "code-bl",
    kind: "code",
    delay: 0.55,
    className:
      "hidden sm:block absolute bottom-[16%] left-[10%] md:left-[14%] w-40 md:w-48 rotate-2",
  },
  {
    id: "card-br",
    kind: "card",
    delay: 0.5,
    className:
      "hidden md:block absolute bottom-[14%] right-[10%] w-36 lg:w-40 -rotate-3",
  },
];

const FragmentPreview: React.FC<{ kind: UiFragment["kind"] }> = ({ kind }) => {
  if (kind === "browser") {
    return (
      <div className="rounded-xl border border-[color:var(--glass-border)] bg-[color:var(--surface-primary)]/80 backdrop-blur-md shadow-[var(--glass-shadow)] overflow-hidden">
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-[color:var(--glass-border)]">
          <span className="h-1.5 w-1.5 rounded-full bg-red-400/80" />
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400/80" />
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
          <span className="ml-2 h-1.5 flex-1 rounded-full bg-[color:var(--surface-tertiary)]" />
        </div>
        <div className="p-3 space-y-2">
          <div className="h-2 w-3/4 rounded bg-blue-500/25" />
          <div className="h-2 w-full rounded bg-[color:var(--surface-tertiary)]" />
          <div className="h-2 w-5/6 rounded bg-[color:var(--surface-tertiary)]" />
          <div className="mt-2 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/10" />
        </div>
      </div>
    );
  }

  if (kind === "code") {
    return (
      <div className="rounded-xl border border-[color:var(--glass-border)] bg-[color:var(--surface-primary)]/80 backdrop-blur-md shadow-[var(--glass-shadow)] p-3 font-mono text-[10px] leading-relaxed text-[color:var(--text-tertiary)]">
        <div>
          <span className="text-blue-500 dark:text-blue-400">const</span>{" "}
          <span className="text-[color:var(--text-primary)]">build</span> = (){" "}
          <span className="text-blue-500 dark:text-blue-400">=&gt;</span> {"{"}
        </div>
        <div className="pl-3">
          <span className="text-indigo-500 dark:text-indigo-400">return</span>{" "}
          <span className="text-emerald-600 dark:text-emerald-400">ui</span>;
        </div>
        <div>{"}"}</div>
        <div className="mt-1.5 h-px w-full bg-[color:var(--glass-border)]" />
        <div className="mt-1.5 h-1.5 w-2/3 rounded bg-blue-500/30" />
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[color:var(--glass-border)] bg-[color:var(--surface-primary)]/80 backdrop-blur-md shadow-[var(--glass-shadow)] overflow-hidden">
      <div className="h-16 bg-gradient-to-br from-blue-600/30 via-indigo-500/20 to-transparent" />
      <div className="p-3 space-y-2">
        <div className="h-2.5 w-2/3 rounded bg-[color:var(--text-primary)]/20" />
        <div className="h-2 w-full rounded bg-[color:var(--surface-tertiary)]" />
        <div className="h-2 w-4/5 rounded bg-[color:var(--surface-tertiary)]" />
        <div className="flex gap-1.5 pt-1">
          <span className="h-4 w-10 rounded-md bg-blue-500/20" />
          <span className="h-4 w-12 rounded-md bg-indigo-500/15" />
        </div>
      </div>
    </div>
  );
};

/**
 * Cinematic first-load reveal for the portfolio.
 * Mount once in `_app` — never re-triggers on section nav, modals, or client routes.
 */
const LoadingOverlay: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  const initials = useMemo(
    () => getInitials(profileData.name).split(""),
    []
  );
  const nameParts = useMemo(
    () => profileData.name.split(" "),
    []
  );

  useLayoutEffect(() => {
    document.getElementById("app-boot-loader")?.remove();
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;

    html.classList.add("app-loading");
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    let cancelled = false;
    const startedAt = Date.now();
    const minMs = reduceMotion ? 600 : MIN_DISPLAY_MS;
    const maxMs = reduceMotion ? 1500 : MAX_DISPLAY_MS;

    const waitForDocumentReady = (): Promise<void> => {
      if (document.readyState === "complete") {
        return Promise.resolve();
      }
      return new Promise((resolve) => {
        window.addEventListener("load", () => resolve(), { once: true });
      });
    };

    const waitForFonts = (): Promise<void> => {
      if (!document.fonts?.ready) return Promise.resolve();
      return document.fonts.ready.then(() => undefined).catch(() => undefined);
    };

    const waitForCriticalImage = (): Promise<void> => {
      const src = profileData.avatar;
      const existing = Array.from(document.images).find((img) =>
        img.src.includes(src.replace(/^\//, ""))
      );
      if (existing?.complete) return Promise.resolve();

      return new Promise((resolve) => {
        const img = new Image();
        const done = () => resolve();
        img.onload = done;
        img.onerror = done;
        img.src = src;
        window.setTimeout(done, 1200);
      });
    };

    const waitWithTimeout = (promise: Promise<void>, ms: number) =>
      Promise.race([
        promise,
        new Promise<void>((resolve) => {
          window.setTimeout(resolve, ms);
        }),
      ]);

    const finish = () => {
      if (!cancelled) setIsVisible(false);
    };

    const run = async () => {
      await waitWithTimeout(
        Promise.all([
          waitForDocumentReady(),
          waitForFonts(),
          waitForCriticalImage(),
        ]).then(() => undefined),
        maxMs
      );

      if (cancelled) return;

      const elapsed = Date.now() - startedAt;
      const extraWait = Math.min(
        Math.max(0, minMs - elapsed),
        Math.max(0, maxMs - elapsed)
      );

      if (extraWait > 0) {
        await new Promise<void>((resolve) => {
          window.setTimeout(resolve, extraWait);
        });
      }

      finish();
    };

    void run();
    const failsafeId = window.setTimeout(finish, maxMs);

    return () => {
      cancelled = true;
      window.clearTimeout(failsafeId);
      html.classList.remove("app-loading");
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
    };
  }, [reduceMotion]);

  const handleExitComplete = () => {
    document.documentElement.classList.remove("app-loading");
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  };

  const exitDuration = reduceMotion ? REDUCED_EXIT_S : EXIT_DURATION_S;

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[200] pointer-events-auto overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={
            reduceMotion
              ? {
                  opacity: 0,
                  transition: { duration: exitDuration, ease: EASE_THEME },
                }
              : {
                  opacity: 0,
                  transition: {
                    when: "afterChildren",
                    duration: 0.05,
                    ease: EASE_THEME,
                  },
                }
          }
          role="status"
          aria-live="polite"
          aria-busy="true"
          aria-label="Loading portfolio"
        >
          {/* Full backdrop (reduced motion) or split panels that open into the hero */}
          {reduceMotion ? (
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: "rgb(var(--background-start-rgb))",
                backgroundImage:
                  "linear-gradient(to bottom, rgb(var(--background-start-rgb)), rgb(var(--background-end-rgb)))",
              }}
            />
          ) : (
            <>
              <motion.div
                className="absolute inset-x-0 top-0 h-[52%] origin-top"
                style={{
                  backgroundColor: "rgb(var(--background-start-rgb))",
                  backgroundImage:
                    "linear-gradient(to bottom, rgb(var(--background-start-rgb)), rgb(var(--background-end-rgb)))",
                }}
                exit={{
                  y: "-105%",
                  transition: { duration: exitDuration, ease: EASE_OUT },
                }}
              />
              <motion.div
                className="absolute inset-x-0 bottom-0 h-[52%] origin-bottom"
                style={{
                  backgroundColor: "rgb(var(--background-end-rgb))",
                  backgroundImage:
                    "linear-gradient(to top, rgb(var(--background-end-rgb)), rgb(var(--background-start-rgb)))",
                }}
                exit={{
                  y: "105%",
                  transition: { duration: exitDuration, ease: EASE_OUT },
                }}
              />
            </>
          )}

          {/* Atmosphere: grid + glow (desktop-weighted) */}
          {!reduceMotion && (
            <>
              <motion.div
                className="absolute inset-0 opacity-[0.35] dark:opacity-[0.22]"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, color-mix(in srgb, var(--primary-color) 18%, transparent) 1px, transparent 1px),
                    linear-gradient(to bottom, color-mix(in srgb, var(--primary-color) 18%, transparent) 1px, transparent 1px)
                  `,
                  backgroundSize: "48px 48px",
                  maskImage:
                    "radial-gradient(ellipse at center, black 20%, transparent 70%)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse at center, black 20%, transparent 70%)",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.25 } }}
                transition={{ duration: 0.6, ease: EASE_THEME }}
                aria-hidden="true"
              />
              <motion.div
                className="absolute left-1/2 top-[42%] h-56 w-56 md:h-72 md:w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 dark:bg-blue-400/15 blur-3xl"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.15, transition: { duration: 0.4 } }}
                transition={{ duration: 0.7, ease: EASE_OUT }}
                aria-hidden="true"
              />
              <motion.div
                className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 dark:via-white/10 to-transparent"
                initial={{ x: "-40%", opacity: 0 }}
                animate={{ x: "280%", opacity: [0, 0.7, 0] }}
                transition={{ duration: 1.35, delay: 0.55, ease: EASE_THEME }}
                aria-hidden="true"
              />
            </>
          )}

          {/* Abstract UI fragments — fewer on small screens via CSS */}
          {!reduceMotion &&
            DESKTOP_FRAGMENTS.map((fragment) => (
              <motion.div
                key={fragment.id}
                className={fragment.className}
                initial={{ opacity: 0, y: 28, scale: 0.94 }}
                animate={{ opacity: 0.92, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  y: fragment.id.includes("t") ? -48 : 48,
                  scale: 0.96,
                  transition: { duration: 0.35, ease: EASE_THEME },
                }}
                transition={{
                  duration: 0.55,
                  delay: fragment.delay,
                  ease: EASE_OUT,
                }}
                aria-hidden="true"
              >
                <FragmentPreview kind={fragment.kind} />
              </motion.div>
            ))}

          {/* Center brand reveal */}
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <motion.div
              className="relative flex flex-col items-center gap-4 text-center select-none"
              exit={
                reduceMotion
                  ? { opacity: 0, transition: { duration: exitDuration } }
                  : {
                      opacity: 0,
                      y: -28,
                      scale: 0.96,
                      transition: {
                        duration: 0.4,
                        ease: EASE_OUT,
                      },
                    }
              }
            >
              <div
                className="flex items-baseline justify-center gap-1 md:gap-2 overflow-hidden"
                aria-hidden="true"
              >
                {initials.map((letter, index) => (
                  <motion.span
                    key={`${letter}-${index}`}
                    className="inline-block text-5xl sm:text-6xl md:text-7xl font-bold tracking-[0.18em] text-[color:var(--text-primary)]"
                    initial={
                      reduceMotion
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: "110%" }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={
                      reduceMotion
                        ? { duration: 0.2 }
                        : {
                            duration: 0.55,
                            delay: 0.12 + index * 0.1,
                            ease: EASE_OUT,
                          }
                    }
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>

              <div className="overflow-hidden">
                <motion.p
                  className="flex flex-wrap items-center justify-center gap-x-2 text-sm sm:text-base md:text-lg font-medium tracking-wide text-[color:var(--text-secondary)]"
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={
                    reduceMotion
                      ? { duration: 0.2 }
                      : { duration: 0.35, delay: 0.45 }
                  }
                >
                  {nameParts.map((part, index) => (
                    <motion.span
                      key={`${part}-${index}`}
                      className="inline-block"
                      initial={
                        reduceMotion
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 16 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      transition={
                        reduceMotion
                          ? { duration: 0.15 }
                          : {
                              duration: 0.4,
                              delay: 0.5 + index * 0.08,
                              ease: EASE_OUT,
                            }
                      }
                    >
                      {part}
                    </motion.span>
                  ))}
                </motion.p>
              </div>

              <motion.div
                className="relative mt-1 h-px w-24 sm:w-28 overflow-hidden rounded-full bg-[color:var(--glass-border)]"
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scaleX: 0.4 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={
                  reduceMotion
                    ? { duration: 0.15 }
                    : { duration: 0.45, delay: 0.7, ease: EASE_OUT }
                }
                aria-hidden="true"
              >
                <motion.div
                  className="absolute inset-y-0 left-0 bg-[color:var(--primary-color)]"
                  initial={{ width: reduceMotion ? "100%" : "0%" }}
                  animate={{ width: "100%" }}
                  transition={
                    reduceMotion
                      ? { duration: 0.15 }
                      : { duration: 0.9, delay: 0.75, ease: EASE_THEME }
                  }
                />
              </motion.div>

              <motion.p
                className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-[color:var(--text-tertiary)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: reduceMotion ? 0.85 : 1 }}
                transition={
                  reduceMotion
                    ? { duration: 0.2 }
                    : { duration: 0.4, delay: 0.95 }
                }
              >
                Portfolio
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingOverlay;
