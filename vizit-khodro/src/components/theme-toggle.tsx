"use client";

import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme, systemTheme, resolvedTheme } = useTheme();

  const currentTheme =
    theme === "system"
      ? resolvedTheme ?? systemTheme ?? "light"
      : theme ?? "light";

  const isDark = currentTheme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isDark ? "تغییر به حالت روشن" : "تغییر به حالت تیره"}
      className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-neutral-200/60 bg-white/80 text-neutral-600 backdrop-blur transition-all duration-300 ease-smooth hover:shadow-glow dark:border-white/10 dark:bg-surface-muted/80 dark:text-neutral-200"
    >
      <span
        className="absolute inset-0 translate-y-0 bg-gradient-to-br from-primary/10 to-accent/20 opacity-0 transition-opacity duration-500 ease-smooth group-hover:opacity-100"
        aria-hidden
      />
      <span className="relative flex items-center justify-center">
        {isDark ? (
          <MoonIcon className="h-5 w-5" />
        ) : (
          <SunIcon className="h-5 w-5" />
        )}
      </span>
    </button>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 18.5A6.5 6.5 0 1 0 12 5.5a6.5 6.5 0 0 0 0 13Z" />
      <path d="M12 1v2.5M12 20.5V23M4.22 4.22 5.64 5.64M18.36 18.36l1.42 1.42M1 12h2.5M20.5 12H23M4.22 19.78 5.64 18.36M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 14.5A9 9 0 0 1 11.5 5 7.5 7.5 0 1 0 21 14.5Z" />
    </svg>
  );
}
