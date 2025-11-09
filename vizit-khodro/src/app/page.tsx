"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { BackToTopButton } from "@/components/back-to-top";
import { Preloader } from "@/components/preloader";
import { fadeIn, stagger, scaleIn, blurIn } from "@/lib/animations";

const navLinks = [
  { title: "خانه", href: "#hero" },
  { title: "خدمات", href: "#services" },
  { title: "چرا ما", href: "#highlights" },
  { title: "فرآیند", href: "#process" },
  { title: "نظرات", href: "#testimonials" },
  { title: "تماس", href: "#contact" },
];

const services = [
  {
    title: "تعمیرات تخصصی و عیب‌یابی الکترونیکی",
    description:
      "بررسی کامل سیستم‌های برقی و مکانیکی با دستگاه‌های به‌روز و ارائه گزارش دیجیتال.",
    points: [
      "آپدیت ECU و رفع خطاهای سنسورها",
      "تنظیم و بازسازی سیستم سوخت‌رسانی",
      "عیب‌یابی دقیق سیستم جلوبندی و تعلیق",
    ],
    icon: <ToolsIcon />,
  },
  {
    title: "سرویس‌های اورژانسی در محل شما",
    description:
      "اعزام تکنسین مجرب در کمتر از ۳۰ دقیقه به تمام نقاط مشهد با تجهیزات کامل.",
    points: [
      "دریافت نوتیفیکیشن لحظه‌ای وضعیت سرویس",
      "سرویس سیار شارژ باتری و پنچرگیری",
      "پشتیبانی تلفنی ۲۴ ساعته و تمدید گارانتی",
    ],
    icon: <LightningIcon />,
  },
  {
    title: "دیتیلینگ، کاور و بازسازی صفر تا صد",
    description:
      "احیای رنگ بدنه، سرامیک حرفه‌ای و بازسازی کابین با متریال معتبر اروپایی.",
    points: [
      "پکیج سرامیک چندلایه با ضمانت مکتوب",
      "ترمیم خط و خش و بازسازی چراغ‌ها",
      "صفرشویی حرفه‌ای و نانو گلس",
    ],
    icon: <SparkleIcon />,
  },
];

const statsData = [
  { value: "۱۲+", label: "تکنسین خبره و آموزش‌دیده" },
  { value: "۹۸٪", label: "رضایت مشتریان در ۶ ماه اخیر" },
  { value: "۲۴/۷", label: "پشتیبانی فوری و مشاوره رایگان" },
  { value: "۴۵ دقیقه", label: "میانگین زمان اعزام سیار" },
];

const highlights = [
  {
    title: "گزارش شفاف و آنلاین",
    description:
      "دریافت داشبورد اختصاصی با امکان پیگیری مرحله‌به‌مرحله خدمات، تصاویر قبل و بعد و بارکد ضمانت.",
    icon: <DashboardIcon />,
  },
  {
    title: "قطعات اصلی تضمین‌شده",
    description:
      "تأمین مستقیم قطعات OEM با ضمانت اصالت و مرجوعی بدون قید و شرط تا ۳۰ روز.",
    icon: <ShieldIcon />,
  },
  {
    title: "فضای مدرن و استاندارد",
    description:
      "کارگاه تخصصی با فضای مدرن، اتاق انتظار VIP، اینترنت پرسرعت و امکان کار هم‌زمان مشتری.",
    icon: <WorkspaceIcon />,
  },
];

const process = [
  {
    step: "۱",
    title: "ثبت درخواست هوشمند",
    description:
      "انتخاب نوع سرویس، زمان دلخواه و ثبت توضیحات تکمیلی در کمتر از یک دقیقه.",
  },
  {
    step: "۲",
    title: "کارشناسی و ارائه برآورد",
    description:
      "ارسال کارشناس فنی، انجام تست‌های تخصصی و ارائه پیش‌فاکتور دیجیتال تاییدشده.",
  },
  {
    step: "۳",
    title: "اجرای دقیق سرویس",
    description:
      "انجام سرویس طبق چک‌لیست استاندارد، استفاده از ابزارهای مدرن و ثبت تمام جزئیات.",
  },
  {
    step: "۴",
    title: "تحویل به‌همراه ضمانت",
    description:
      "کنترل کیفی دوبار، تحویل خودرو و فعال‌سازی ضمانت کتبی با پشتیبانی ۲۴ ساعته.",
  },
];

const testimonials = [
  {
    name: "مهدی فدایی",
    role: "مالک هیوندا سانتافه",
    content:
      "برای اولین‌بار بود که تعمیرگاه با این سطح از نظم دیدم. کاملاً آنلاین وضعیت خودرو را پیگیری کردم و حتی قبل از تحویل، فیلم تست نهایی را ارسال کردند.",
    rating: 5,
  },
  {
    name: "سارا حجتی",
    role: "مدیر شرکت حمل و نقل شهری",
    content:
      "ناوگان ما به طور کامل تحت پوشش ویزیت خودروست. سرعت اعزام، گزارش‌های دقیق و رفتار حرفه‌ای تیم فوق‌العاده است. پیشنهاد می‌کنم پلن سازمانی را امتحان کنید.",
    rating: 5,
  },
  {
    name: "حمیدرضا ناصری",
    role: "راننده تاکسی اینترنتی",
    content:
      "سرویس دوره‌ای را در محل انجام دادند و تمام قطعات تعویض شده را به من تحویل دادند. پرداخت قسطی و پشتیبانی بعد از سرویس واقعاً عالی بود.",
    rating: 5,
  },
];

const faqs = [
  {
    question: "آیا خدمات شما شامل گارانتی می‌شود؟",
    answer:
      "تمامی خدمات مکانیکی تا ۹۰ روز و خدمات الکترونیکی و برق خودرو تا ۴۵ روز دارای ضمانت کتبی هستند. همچنین سرامیک و دیتیلینگ بین ۶ تا ۱۲ ماه ضمانت دارند.",
  },
  {
    question: "چطور می‌توانم وضعیت تعمیر خودرو را پیگیری کنم؟",
    answer:
      "پس از ثبت سرویس، داشبورد آنلاین برای شما فعال می‌شود و می‌توانید وضعیت مراحل، تصاویر و گزارش‌های فنی را در لحظه مشاهده کنید.",
  },
  {
    question: "هزینه سرویس‌های سیار چگونه محاسبه می‌شود؟",
    answer:
      "هزینه اعزام اولیه ثابت است و بعد از عیب‌یابی، پیش‌فاکتور شفاف برای شما ارسال می‌شود. در صورت عدم تایید، تنها هزینه اعزام دریافت می‌گردد.",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
      <Preloader />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-[-10%] top-[-30%] h-[480px] w-[480px] rounded-full bg-accent/15 blur-[160px] dark:bg-primary/25" />
        <div className="absolute left-[-15%] top-[20%] h-[420px] w-[420px] rounded-full bg-primary/10 blur-[140px] dark:bg-accent/20" />
        <div className="absolute bottom-[-10%] left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/10 blur-[200px] dark:bg-accent/20" />
      </div>
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <main className="flex-1">
          <HeroSection stats={statsData} />
          <ServicesSection />
          <HighlightsSection />
          <ProcessSection />
          <TestimonialsSection />
          <FaqSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
      <BackToTopButton />
    </div>
  );
}

type HeaderProps = {
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
};

function Header({ menuOpen, setMenuOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-white/80 backdrop-blur-xl transition-all duration-300 ease-smooth dark:border-white/5 dark:bg-surface-muted/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
        <div className="flex items-center gap-3">
          <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-glow">
            <span className="absolute inset-0 animate-pulse-soft bg-gradient-to-br from-white/30 to-transparent" />
            <span className="relative text-lg font-bold tracking-tight">
              VH
            </span>
          </div>
          <div>
            <p className="text-lg font-bold text-neutral-900 dark:text-white">
              ویزیت خودرو
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-300">
              تعمیرات و خدمات خودرو در مشهد
            </p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-neutral-600 transition-colors duration-200 ease-smooth hover:text-primary dark:text-neutral-300 dark:hover:text-accent"
            >
              {item.title}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="tel:05191015050"
            className="rounded-full border border-primary/40 px-5 py-2 text-sm font-semibold text-primary transition-colors duration-200 ease-smooth hover:bg-primary hover:text-white dark:border-accent/40 dark:text-accent dark:hover:bg-accent dark:hover:text-white"
          >
            تماس فوری
          </a>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-200 ease-smooth hover:border-primary/60 dark:border-white/10 dark:bg-surface-muted dark:hover:border-accent/50"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label="باز کردن منو"
          >
            <div className="absolute mx-auto h-0.5 w-6 origin-center transform rounded-full bg-neutral-700 transition duration-300 ease-smooth dark:bg-neutral-100" />
            <div
              className={`absolute mx-auto h-0.5 w-6 origin-center transform rounded-full bg-neutral-700 transition duration-300 ease-smooth dark:bg-neutral-100 ${
                menuOpen ? "translate-y-0 rotate-45" : "-translate-y-2"
              }`}
            />
            <div
              className={`absolute mx-auto h-0.5 w-6 origin-center transform rounded-full bg-neutral-700 transition duration-300 ease-smooth dark:bg-neutral-100 ${
                menuOpen ? "translate-y-0 -rotate-45" : "translate-y-2"
              }`}
            />
          </button>
        </div>
      </div>

      <motion.nav
        id="mobile-nav"
        initial={false}
        animate={menuOpen ? "open" : "closed"}
        variants={{
          open: {
            height: "auto",
            opacity: 1,
            transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
          },
          closed: {
            height: 0,
            opacity: 0,
            transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
          },
        }}
        className="lg:hidden"
      >
        <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 pb-6">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-2xl border border-neutral-200/70 bg-white/80 px-4 py-3 text-center text-sm font-semibold text-neutral-700 transition-all duration-200 ease-smooth hover:border-primary/30 hover:text-primary dark:border-white/10 dark:bg-surface-muted/80 dark:text-neutral-200 dark:hover:border-accent/30 dark:hover:text-accent"
            >
              {item.title}
            </a>
          ))}
          <a
            href="tel:05191015050"
            className="rounded-2xl bg-primary px-4 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-transform duration-200 ease-smooth hover:scale-[1.01] dark:bg-accent"
          >
            تماس فوری
          </a>
        </div>
      </motion.nav>
    </header>
  );
}

type HeroStats = typeof statsData;

function HeroSection({ stats }: { stats: HeroStats }) {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden px-4 pb-24 pt-20 md:px-8 lg:flex lg:min-h-[640px] lg:items-center"
    >
      <div className="absolute inset-0 -z-10 bg-[var(--accent-gradient)]" />
      <motion.div
        className="mx-auto flex w-full max-w-6xl flex-col items-center gap-12 lg:flex-row lg:items-stretch"
        variants={stagger(0.18, 0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          variants={fadeIn("up")}
          className="flex-1 space-y-8 text-center lg:text-right"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-white/70 px-4 py-2 text-xs font-semibold text-primary shadow-sm shadow-primary/10 backdrop-blur-md dark:border-accent/30 dark:bg-surface-muted/80 dark:text-accent">
            <span className="h-2 w-2 rounded-full bg-primary dark:bg-accent" />
            سرویس ویژه زمستان ۱۴۰۲ فعال شد
          </div>
          <h1 className="text-3xl font-black leading-[1.4] text-neutral-900 sm:text-4xl md:text-5xl xl:text-[52px] dark:text-white">
            تعمیرات و نگهداری خودرو با استاندارد اروپایی در مشهد
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-8 text-neutral-600 md:text-lg dark:text-neutral-300">
            از عیب‌یابی صفر تا تحویل نهایی، همه چیز با گزارش شفاف، ضمانت کتبی و
            تیمی از تکنسین‌های خبره انجام می‌شود. تنها با یک کلیک، سرویس دلخواه
            خود را رزرو کنید و روند کار را لحظه‌به‌لحظه مشاهده نمایید.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href="#contact"
              className="flex items-center gap-3 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-xl shadow-primary/30 transition-transform duration-200 ease-precise hover:-translate-y-1 hover:shadow-glow dark:bg-accent"
            >
              رزرو آنلاین سرویس
              <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-medium">
                تایید فوری
              </span>
            </a>
            <a
              href="https://wa.me/989151234567"
              className="flex items-center gap-2 rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-700 transition-all duration-200 ease-smooth hover:border-primary hover:text-primary dark:border-white/20 dark:text-neutral-200 dark:hover:border-accent dark:hover:text-accent"
            >
              مشاوره واتساپ
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 8h10M7 12h6M5 21l2-4H5a1 1 0 0 1-1-1V5c0-.55.45-1 1-1h14a1 1 0 0 1 1 1v11c0 .55-.45 1-1 1h-6z" />
              </svg>
            </a>
          </div>
          <motion.div
            className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4"
            variants={stagger(0.1, 0.2)}
          >
            {stats.map((item, index) => (
              <motion.div
                key={item.label}
                variants={fadeIn("up", index * 0.08, 0.45, 18)}
                className="rounded-2xl border border-white/10 bg-white/40 p-4 text-center shadow-inner-glow backdrop-blur-md dark:border-white/5 dark:bg-surface-muted/80"
              >
                <div className="text-2xl font-bold text-primary dark:text-accent">
                  {item.value}
                </div>
                <div className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        <motion.div
          variants={scaleIn(0.12)}
          className="relative flex w-full max-w-xl items-center justify-center"
        >
          <div className="relative h-[360px] w-full rounded-[32px] border border-white/10 bg-gradient-to-br from-neutral-900 via-neutral-950 to-surface-muted p-6 shadow-2xl shadow-black/40 dark:border-white/5 md:h-[420px]">
            <div className="absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_70%)] mix-blend-screen" />
            <div className="absolute inset-0 overflow-hidden rounded-[32px]">
              <Image
                src="/hero-car.svg"
                alt="تعمیرگاه مدرن خودرو"
                fill
                className="object-cover object-center opacity-90"
                priority
              />
            </div>
            <div className="absolute bottom-6 left-1/2 flex w-11/12 -translate-x-1/2 flex-col gap-2 rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-lg dark:border-white/10 dark:bg-white/5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">
                  تست‌های هوشمند فعال
                </span>
                <span className="text-white/80">۱۰ از ۱۲</span>
              </div>
              <div className="relative h-2 overflow-hidden rounded-full bg-white/20">
                <div className="absolute inset-y-0 right-0 w-9/12 rounded-full bg-gradient-to-l from-primary to-accent" />
              </div>
              <div className="flex items-center justify-between text-[11px] text-white/80">
                <span>ECU - به‌روزرسانی</span>
                <span>در حال اجرا</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section
      id="services"
      className="relative mx-auto max-w-6xl px-4 py-20 md:px-8"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger(0.16, 0.18)}
        className="space-y-12"
      >
        <motion.div
          variants={fadeIn("up")}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary dark:bg-accent/15 dark:text-accent">
            سرویس‌های هوشمند
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-neutral-900 md:text-4xl dark:text-white">
            هر آنچه خودرو شما نیاز دارد، از بازدید دوره‌ای تا بازسازی کامل
          </h2>
          <p className="mt-4 text-base text-neutral-600 dark:text-neutral-300">
            پکیج‌های تخصصی با امکان شخصی‌سازی، ثبت گزارش و پرداخت مرحله‌ای برای
            مالکین خودروهای شخصی و سازمانی.
          </p>
        </motion.div>
        <motion.div
          variants={stagger(0.18, 0.1)}
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              variants={blurIn(index * 0.1)}
              className="group relative flex h-full flex-col gap-6 rounded-3xl border border-neutral-200/70 bg-white/85 p-6 shadow-sm transition-all duration-300 ease-smooth hover:-translate-y-2 hover:border-primary/40 hover:shadow-glow dark:border-white/10 dark:bg-surface-muted/85"
            >
              <span className="absolute left-6 top-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-2xl text-primary transition-colors duration-300 ease-smooth group-hover:bg-primary group-hover:text-white dark:bg-accent/10 dark:text-accent dark:group-hover:bg-accent">
                {service.icon}
              </span>
              <div className="pt-16">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-neutral-600 dark:text-neutral-300">
                  {service.description}
                </p>
              </div>
              <ul className="space-y-3 text-sm text-neutral-500 dark:text-neutral-300">
                {service.points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary dark:bg-accent/15 dark:text-accent">
                      <svg
                        className="h-3 w-3"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m5 12 5 5L20 7" />
                      </svg>
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="mt-auto inline-flex items-center justify-between rounded-2xl border border-primary/30 px-5 py-3 text-sm font-semibold text-primary transition-all duration-200 ease-smooth hover:bg-primary hover:text-white dark:border-accent/30 dark:text-accent dark:hover:bg-accent dark:hover:text-white"
              >
                درخواست این سرویس
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m13 18 6-6-6-6" />
                </svg>
              </a>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function HighlightsSection() {
  return (
    <section
      id="highlights"
      className="relative border-y border-white/10 bg-gradient-to-b from-white/60 via-white/40 to-transparent py-20 dark:border-white/5 dark:from-surface-muted/50 dark:via-surface-muted/70 dark:to-transparent"
    >
      <div className="pattern-grid absolute inset-0 opacity-40 dark:opacity-20" />
      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger(0.18, 0.12)}
        >
          <motion.div
            variants={fadeIn("up")}
            className="mx-auto mb-12 max-w-3xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent dark:bg-primary/15 dark:text-primary/90">
              چرا ویزیت خودرو؟
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-neutral-900 md:text-4xl dark:text-white">
              تجربه‌ای فراتر از یک تعمیرگاه معمولی
            </h2>
            <p className="mt-4 text-base text-neutral-600 dark:text-neutral-300">
              ما استانداردهای جهانی تعمیرات خودرو را با تکنولوژی روز و تیمی
              متخصص ترکیب کرده‌ایم تا خیالتان از رانندگی در جاده‌های مشهد راحت
              باشد.
            </p>
          </motion.div>
          <motion.div
            className="grid gap-6 md:grid-cols-3"
            variants={stagger(0.16, 0.14)}
          >
            {highlights.map((highlight) => (
              <motion.div
                key={highlight.title}
                variants={fadeIn("up")}
                className="relative flex h-full flex-col gap-4 rounded-3xl border border-white/30 bg-white/80 p-6 shadow-lg shadow-neutral-900/5 backdrop-blur-md transition-all duration-300 ease-smooth hover:-translate-y-2 hover:border-primary/50 dark:border-white/10 dark:bg-surface-muted/80 dark:shadow-black/30"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-2xl text-accent dark:bg-primary/15 dark:text-primary">
                  {highlight.icon}
                </span>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                  {highlight.title}
                </h3>
                <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-300">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section id="process" className="mx-auto max-w-6xl px-4 py-20 md:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger(0.18, 0.1)}
        className="grid gap-12 lg:grid-cols-[1.15fr,1fr]"
      >
        <motion.div variants={fadeIn("up")} className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary dark:bg-accent/15 dark:text-accent">
            مسیر شفاف خدمات
          </span>
          <h2 className="text-3xl font-extrabold text-neutral-900 md:text-4xl dark:text-white">
            جریان کاری دقیق و زمان‌بندی‌شده با اطلاع‌رسانی لحظه‌ای
          </h2>
          <p className="text-base text-neutral-600 dark:text-neutral-300">
            با تکیه بر داشبورد هوشمند و تیم پشتیبانی همیشه آنلاین، تمام مراحل
            سرویس از زمان رزرو تا تحویل را بدون دغدغه مدیریت کنید.
          </p>
          <div className="flex flex-col gap-5 text-sm text-neutral-600 dark:text-neutral-300">
            <div className="flex items-start gap-3 rounded-2xl border border-primary/30 bg-primary/5 p-4 dark:border-accent/30 dark:bg-accent/10">
              <svg
                className="h-6 w-6 flex-shrink-0 text-primary dark:text-accent"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M3 10h18" />
              </svg>
              <p>
                امکان انتخاب زمان‌بندی دقیق، دریافت یادآوری‌های هوشمند و تغییر
                نوبت تا ۲۴ ساعت قبل از سرویس بدون هزینه.
              </p>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-accent/40 bg-accent/10 p-4 dark:border-primary/30 dark:bg-primary/10">
              <svg
                className="h-6 w-6 flex-shrink-0 text-accent dark:text-primary"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 8v8" />
                <path d="m8 12 4-4 4 4" />
                <path d="M21 12a9 9 0 1 1-9-9" />
              </svg>
              <p>
                پس از پایان سرویس، گزارش کامل فنی همراه با توصیه‌های نگهداری و
                برنامه‌ زمان‌بندی سرویس بعدی دریافت می‌کنید.
              </p>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="flex flex-col gap-4"
          variants={stagger(0.1, 0.1)}
        >
          {process.map((item, index) => (
            <motion.div
              key={item.title}
              variants={fadeIn("up", index * 0.05)}
              className="relative rounded-3xl border border-neutral-200/70 bg-white/85 p-6 shadow-sm transition-all duration-300 ease-smooth hover:-translate-y-1 hover:border-accent/40 dark:border-white/10 dark:bg-surface-muted/85"
            >
              <div className="absolute left-6 top-6 flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-sm font-bold text-white">
                {item.step}
              </div>
              <div className="ps-14">
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-300">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative border-y border-white/10 bg-neutral-900 py-20 dark:border-white/5 dark:bg-black"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(76,114,255,0.25),transparent_60%)]" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 md:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger(0.2, 0.14)}
        >
          <motion.div
            variants={fadeIn("up")}
            className="max-w-3xl text-center lg:text-right"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white">
              ضمانت رضایت ۱۰۰٪
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-white md:text-4xl">
              مشتریانمان دلیل اصلی رشد ویزیت خودرو هستند
            </h2>
            <p className="mt-4 text-base text-white/70">
              بخشی از بازخورد مشتریان وفاداری که مسئولیت نگهداری خودرویشان را به
              ما سپرده‌اند.
            </p>
          </motion.div>
          <motion.div
            variants={stagger(0.16, 0.1)}
            className="grid gap-6 lg:grid-cols-3"
          >
            {testimonials.map((testimonial) => (
              <motion.blockquote
                key={testimonial.name}
                variants={fadeIn("up")}
                className="flex h-full flex-col gap-4 rounded-3xl border border-white/10 bg-white/10 p-6 text-white shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-lg transition-transform duration-300 ease-smooth hover:-translate-y-2"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-lg font-bold">
                    {testimonial.name.substring(0, 1)}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      {testimonial.name}
                    </h3>
                    <p className="text-xs text-white/70">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-sm leading-7 text-white/80">
                  {testimonial.content}
                </p>
                <div className="mt-auto flex items-center gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, idx) => (
                    <svg
                      key={idx}
                      className="h-4 w-4 text-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="m12 2 2.6 6.7 7.1.3-5.5 4.7 1.7 6.9-6-3.8-6 3.8 1.7-6.9-5.5-4.7 7.1-.3L12 2Z" />
                    </svg>
                  ))}
                </div>
              </motion.blockquote>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section id="faq" className="mx-auto max-w-5xl px-4 py-20 md:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger(0.18, 0.12)}
        className="space-y-8"
      >
        <motion.div
          variants={fadeIn("up")}
          className="text-center lg:text-right"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary dark:bg-accent/15 dark:text-accent">
            پرسش‌های رایج
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-neutral-900 md:text-4xl dark:text-white">
            پاسخ به سوالات متداول شما
          </h2>
          <p className="mt-4 text-base text-neutral-600 dark:text-neutral-300">
            اگر سوال دیگری دارید، در واتساپ یا تماس تلفنی پاسخگوی شما هستیم.
          </p>
        </motion.div>
        <motion.div variants={stagger(0.14, 0.1)} className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.details
              key={faq.question}
              variants={fadeIn("up", index * 0.04)}
              className="group rounded-2xl border border-neutral-200/70 bg-white/80 p-5 text-sm shadow-sm transition-all duration-200 ease-smooth hover:border-primary/40 dark:border-white/10 dark:bg-surface-muted/80"
            >
              <summary className="cursor-pointer list-none text-base font-semibold text-neutral-900 transition-colors duration-200 ease-smooth group-open:text-primary dark:text-white dark:group-open:text-accent">
                {faq.question}
              </summary>
              <p className="mt-3 text-sm leading-7 text-neutral-600 dark:text-neutral-300">
                {faq.answer}
              </p>
            </motion.details>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function ContactSection() {
  return (
    <section
      id="contact"
      className="relative mx-auto max-w-6xl rounded-[36px] border border-white/20 bg-white/80 px-4 py-16 shadow-xl shadow-neutral-900/10 backdrop-blur-md md:px-8 dark:border-white/10 dark:bg-surface-muted/80"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger(0.16, 0.12)}
        className="flex flex-col gap-10 lg:flex-row"
      >
        <motion.div variants={fadeIn("up")} className="flex-1 space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent dark:bg-primary/15 dark:text-primary">
            رزرو سریع
          </span>
          <h2 className="text-3xl font-extrabold text-neutral-900 md:text-4xl dark:text-white">
            آماده‌ایم تا خودرو شما را در بهترین وضعیت نگه داریم
          </h2>
          <p className="text-base text-neutral-600 dark:text-neutral-300">
            از طریق فرم زیر یا تماس مستقیم می‌توانید نوبت خود را رزرو کنید.
            کارشناسان ما در کمتر از ۱۵ دقیقه با شما تماس می‌گیرند.
          </p>
          <div className="grid gap-4 text-sm text-neutral-600 dark:text-neutral-300">
            <div className="flex items-center gap-3 rounded-2xl border border-neutral-200/70 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
              <svg
                className="h-6 w-6 text-primary dark:text-accent"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.15 9.81 19.86 19.86 0 0 1 .08 1.18 2 2 0 0 1 2.06-1h3a2 2 0 0 1 2 1.72 12.73 12.73 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L6.1 7.91a16 16 0 0 0 6 6l1.27-1.21a2 2 0 0 1 2.11-.45 12.73 12.73 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
              </svg>
              <div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  پشتیبانی ۲۴ ساعته
                </p>
                <a href="tel:05191015050" className="text-lg font-bold">
                  ۰۵۱-۹۱۰۱۵۰۵۰
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-neutral-200/70 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
              <svg
                className="h-6 w-6 text-accent dark:text-primary"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  آدرس تعمیرگاه مرکزی
                </p>
                <p className="text-base font-semibold">
                  مشهد، بلوار پیروزی، نبش پیروزی ۴۵
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.form
          variants={fadeIn("up", 0.12)}
          className="flex-1 rounded-3xl border border-neutral-200/70 bg-white/90 p-6 shadow-inner-glow dark:border-white/10 dark:bg-surface-muted/85"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-300">
                نام و نام خانوادگی
              </label>
              <input
                type="text"
                placeholder="مثلاً علی رضایی"
                className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 outline-none transition-all duration-200 ease-smooth focus:border-primary focus:shadow-glow dark:border-white/10 dark:bg-white/5 dark:text-neutral-200 dark:focus:border-accent"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-300">
                شماره تماس
              </label>
              <input
                type="tel"
                placeholder="۰۹۱۵xxxxxxx"
                className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 outline-none transition-all duration-200 ease-smooth focus:border-primary focus:shadow-glow dark:border-white/10 dark:bg-white/5 dark:text-neutral-200 dark:focus:border-accent"
              />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-300">
              نوع خودرو
            </label>
            <input
              type="text"
              placeholder="برند و مدل خودرو"
              className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 outline-none transition-all duration-200 ease-smooth focus:border-primary focus:shadow-glow dark:border-white/10 dark:bg-white/5 dark:text-neutral-200 dark:focus:border-accent"
            />
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-300">
              خدمات مورد نظر
            </label>
            <select
              className="appearance-none rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 outline-none transition-all duration-200 ease-smooth focus:border-primary focus:shadow-glow dark:border-white/10 dark:bg-white/5 dark:text-neutral-200 dark:focus:border-accent"
            >
              <option>تعمیرات و عیب‌یابی تخصصی</option>
              <option>سرویس دوره‌ای کامل</option>
              <option>دیتیلینگ و سرامیک بدنه</option>
              <option>کارشناسی قبل از خرید</option>
              <option>سرویس سیار در محل</option>
            </select>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-300">
              توضیحات تکمیلی
            </label>
            <textarea
              rows={4}
              placeholder="شرح کوتاهی از مشکل یا سرویسی که نیاز دارید بنویسید."
              className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 outline-none transition-all duration-200 ease-smooth focus:border-primary focus:shadow-glow dark:border-white/10 dark:bg-white/5 dark:text-neutral-200 dark:focus:border-accent"
            />
          </div>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-transform duration-200 ease-precise hover:-translate-y-1 dark:bg-accent"
            >
              ثبت درخواست و تماس فوری
            </button>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              با ثبت درخواست، قوانین و شرایط پشتیبانی ویزیت خودرو را می‌پذیرید.
            </p>
          </div>
        </motion.form>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/10 bg-neutral-950 py-10 text-white dark:border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(28,109,208,0.22),transparent_65%)]" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 text-sm md:px-8 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2 text-center md:text-right">
          <h3 className="text-lg font-semibold">ویزیت خودرو</h3>
          <p className="text-white/70">
            تعمیرات، سرویس دوره‌ای و خدمات تخصصی خودرو در مشهد با ضمانت کتبی و
            پشتیبانی ۲۴ ساعته.
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 text-white/70 md:items-end">
          <a href="mailto:info@vizitcar.ir" className="hover:text-white">
            info@vizitcar.ir
          </a>
          <a href="tel:05191015050" className="hover:text-white">
            ۰۵۱-۹۱۰۱۵۰۵۰
          </a>
        </div>
        <p className="text-center text-xs text-white/50 md:text-left">
          © {new Date().getFullYear()} ویزیت خودرو. تمامی حقوق محفوظ است.
        </p>
      </div>
    </footer>
  );
}

function ToolsIcon() {
  return (
    <svg
      className="h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7 7 10 10" />
      <path d="m12 8 5-5 3 3-5 5" />
      <path d="M3 21v-4a2 2 0 0 1 2-2h4" />
      <path d="M21 3h-4a2 2 0 0 0-2 2v4" />
    </svg>
  );
}

function LightningIcon() {
  return (
    <svg
      className="h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m13 2-2 8h6l-7 12 2-8H6l7-12Z" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg
      className="h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v2" />
      <path d="M5.2 5.2 6.6 6.6" />
      <path d="M3 12h2" />
      <path d="m5.2 18.8 1.4-1.4" />
      <path d="M12 19v2" />
      <path d="m17.4 17.4 1.4 1.4" />
      <path d="M19 12h2" />
      <path d="m17.4 6.6 1.4-1.4" />
      <path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
    </svg>
  );
}

function DashboardIcon() {
  return (
    <svg
      className="h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h6v6H4z" />
      <path d="M14 4h6v6h-6z" />
      <path d="M4 14h6v6H4z" />
      <path d="M14 14h6v6h-6z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      className="h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m10 13 2 2 4-4" />
    </svg>
  );
}

function WorkspaceIcon() {
  return (
    <svg
      className="h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="14" x="3" y="8" rx="2" />
      <path d="M12 8V4" />
      <path d="M9 4h6" />
      <path d="M10 12h4" />
      <path d="M12 14v2" />
    </svg>
  );
}
