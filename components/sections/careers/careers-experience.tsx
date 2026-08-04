"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, ArrowUpRight, BriefcaseBusiness, Check, GraduationCap, HeartHandshake, Send, UsersRound } from "lucide-react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SuccessPopup } from "@/components/ui/success-popup";
import { FaqAccordion, type FaqItem } from "@/components/sections/clients/clients-faq";
import { cn } from "@/lib/utils";
import { careers } from "@/content/site-content";
import Link from "next/link";

const applicationSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name."),
  email: z.string().trim().email("Enter a valid email address."),
  number: z.string().trim().regex(/^\+?[0-9\s\-()]{7,20}$/, "Enter a valid phone number."),
  cv: z
    .custom<FileList>((value) => typeof FileList !== "undefined" && value instanceof FileList, "Upload your CV.")
    .refine((files) => files.length === 1, "Upload one CV file.")
    .refine((files) => files[0]?.type === "application/pdf" || files[0]?.name.toLowerCase().endsWith(".pdf"), "Your CV must be a PDF file.")
    .refine((files) => files[0]?.size <= 2 * 1024 * 1024, "Your CV must be 2 MB or smaller."),
});

type ApplicationValues = z.infer<typeof applicationSchema>;

const steps = ["Your details", "Number & CV", "Review"] as const;

const careerFaqItems: readonly FaqItem[] = [
  { question: "How do I apply for a role at InnovGen?", answer: "Use the application form on this page and upload your CV as a PDF. Our recruitment team reviews each application and contacts shortlisted candidates directly." },
  { question: "Which enterprise technologies will I work with?", answer: "The work spans cloud infrastructure, cybersecurity, enterprise networking, virtualization, managed services and digital transformation across the UAE." },
  { question: "Are there opportunities to learn and gain certifications?", answer: "Yes. InnovGen supports practical knowledge-sharing, technical upskilling and relevant learning opportunities that help team members deepen their expertise." },
  { question: "What should I expect from the hiring process?", answer: "The process includes an introductory conversation, a practical technical discussion, a team conversation and a clear offer stage for successful candidates." },
];

function FieldError({ message }: { message?: string }) {
  return message ? <p className="mt-2 text-sm font-medium text-red-700">{message}</p> : null;
}

function CareersApplicationForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<ApplicationValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: { fullName: "", email: "", number: "", cv: undefined },
    mode: "onTouched",
  });

  async function nextStep() {
    const fields: (keyof ApplicationValues)[] = step === 0 ? ["fullName", "email"] : ["number", "cv"];
    if (await form.trigger(fields)) setStep((current) => current + 1);
  }

  async function submit(values: ApplicationValues) {
    if (!(await form.trigger())) return;
    setSubmissionError(null);
    setIsSubmitting(true);

    try {
      const payload = new FormData();
      payload.set("fullName", values.fullName);
      payload.set("email", values.email);
      payload.set("number", values.number);
      payload.set("cv", values.cv[0] as Blob);

      const response = await fetch("/api/careers/applications", { method: "POST", body: payload });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        setSubmissionError(result.message ?? "We could not send your application. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmissionError("We could not send your application. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="application" className="scroll-mt-24 bg-[linear-gradient(180deg,#f7faff_0%,#ffffff_42%)] py-16 text-slate-950 sm:py-24">
      <SuccessPopup
        open={submitted}
        title="Your application has been sent."
        description={`Thank you, ${form.getValues("fullName") || "we have received your details"}. Our team will review your application.`}
        onClose={() => setSubmitted(false)}
      />
      <Container size="standard">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">Start your application</p>
          <h2 className="mt-4 max-w-2xl text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] tracking-[-0.045em]">Tell us where you&apos;d like to make an impact.</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">Share a few details and the InnovGen team will review your interest in the relevant opportunity.</p>

          <ol className="mt-10 grid grid-cols-3 gap-3 rounded-[1.5rem] border border-blue-100 bg-white p-5 shadow-[0_12px_28px_rgb(30_64_175_/_7%)] sm:p-6" aria-label="Application progress">
            {steps.map((label, index) => {
              const current = index === step;
              const complete = index < step || submitted;
              return (
                <li
                  key={label}
                  className={cn(
                    "relative flex flex-col items-center gap-2 text-center last:after:hidden after:absolute after:left-[calc(50%+1.125rem)] after:right-[calc(-50%+0.375rem)] after:top-[1.1rem] after:h-0.5 after:rounded-full",
                    index < step || submitted ? "after:bg-blue-600" : "after:bg-blue-100",
                  )}
                >
                  <span className={cn("grid size-10 shrink-0 place-items-center rounded-full border text-sm font-bold shadow-sm", complete ? "border-blue-600 bg-blue-600 text-white" : current ? "border-blue-600 bg-blue-50 text-blue-700" : "border-blue-100 bg-white text-slate-500")}>
                    {complete ? <Check aria-hidden="true" className="size-4" /> : index + 1}
                  </span>
                  <span className={cn("text-sm font-semibold", current || complete ? "text-slate-950" : "text-slate-400")}>{label}</span>
                </li>
              );
            })}
          </ol>

          <form onSubmit={form.handleSubmit(submit)} className="mt-6 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_28px_70px_rgb(15_23_42_/_12%)]" noValidate>
            {submitted ? (
              <div className="grid min-h-72 place-items-center bg-[radial-gradient(circle_at_50%_0%,#eff6ff,transparent_58%)] p-6 text-center sm:p-10">
                <div className="max-w-md">
                  <span className="mx-auto grid size-14 place-items-center rounded-full bg-blue-600 text-white"><Check aria-hidden="true" className="size-7" /></span>
                  <h3 className="mt-6 text-2xl font-bold">Your interest has been recorded.</h3>
                  <p className="mt-3 leading-7 text-slate-600">Thank you, {form.getValues("fullName")}. The team will review your application details.</p>
                </div>
              </div>
            ) : (
              <div className="p-6 sm:p-10">
                {step === 0 ? (
                  <fieldset className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-5 sm:p-7">
                    <legend className="px-1 text-xl font-bold">Your details</legend>
                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                      <label className="text-sm font-semibold">Full name
                        <input {...form.register("fullName")} autoComplete="name" className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base shadow-sm transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" />
                        <FieldError message={form.formState.errors.fullName?.message} />
                      </label>
                      <label className="text-sm font-semibold">Email address
                        <input {...form.register("email")} type="email" autoComplete="email" className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base shadow-sm transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" />
                        <FieldError message={form.formState.errors.email?.message} />
                      </label>
                    </div>
                  </fieldset>
                ) : null}

                {step === 1 ? (
                  <fieldset className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-5 sm:p-7">
                    <legend className="px-1 text-xl font-bold">Phone &amp; CV</legend>
                    <div className="mt-6 grid gap-5">
                      <label className="text-sm font-semibold">Phone number
                        <input {...form.register("number")} type="tel" autoComplete="tel" placeholder="+971 50 123 4567" className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base shadow-sm transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" />
                        <FieldError message={form.formState.errors.number?.message} />
                      </label>
                      <label className="text-sm font-semibold">Upload CV
                        <input {...form.register("cv")} type="file" accept="application/pdf,.pdf" className="mt-2 block min-h-16 w-full rounded-xl border border-dashed border-blue-200 bg-white px-4 py-3 text-sm shadow-sm file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:font-semibold file:text-blue-700 hover:border-blue-400 hover:file:bg-blue-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" />
                        <span className="mt-2 block text-sm font-normal text-slate-500">PDF only · maximum file size 2 MB</span>
                        <FieldError message={form.formState.errors.cv?.message} />
                      </label>
                    </div>
                  </fieldset>
                ) : null}

                {step === 2 ? (
                  <fieldset className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-5 sm:p-7">
                    <legend className="px-1 text-xl font-bold">Review your application</legend>
                    <dl className="mt-6 grid gap-4 rounded-2xl border border-slate-100 bg-white p-5 text-sm shadow-sm sm:grid-cols-2">
                      <div><dt className="text-slate-500">Name</dt><dd className="mt-1 font-semibold">{form.getValues("fullName")}</dd></div>
                      <div><dt className="text-slate-500">Email</dt><dd className="mt-1 font-semibold">{form.getValues("email")}</dd></div>
                      <div><dt className="text-slate-500">Phone</dt><dd className="mt-1 font-semibold">{form.getValues("number")}</dd></div>
                      <div><dt className="text-slate-500">CV</dt><dd className="mt-1 font-semibold">{form.getValues("cv")?.[0]?.name}</dd></div>
                    </dl>
                    {submissionError ? <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{submissionError}</p> : null}
                  </fieldset>
                ) : null}

                <div className="mt-8 flex flex-wrap justify-between gap-3 border-t border-slate-100 pt-6">
                  {step > 0 ? <button type="button" onClick={() => setStep((current) => current - 1)} className="min-h-11 rounded-full px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Back</button> : <span />}
                  {step < 2 ? <button type="button" onClick={nextStep} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-blue-600 px-6 text-sm font-semibold text-white shadow-[0_12px_24px_rgb(37_99_235_/_24%)] transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Continue <ArrowRight aria-hidden="true" className="size-4" /></button> : <Button type="submit" loading={isSubmitting} loadingLabel="Sending application" className="bg-blue-600 px-6 text-white shadow-[0_12px_24px_rgb(37_99_235_/_24%)] hover:bg-blue-700">Submit application <Send aria-hidden="true" className="size-4" /></Button>}
                </div>
              </div>
            )}
          </form>
        </div>
      </Container>
    </section>
  );
}

export function CareersExperience() {
  const reducedMotion = usePrefersReducedMotion();

  const sectionMotion = {
    initial: reducedMotion ? false : { opacity: 0, y: 36, scale: 0.985 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, amount: 0.18 },
    transition: { duration: reducedMotion ? 0 : 0.62, ease: [0.22, 1, 0.36, 1] as const },
  };

  const technologyLogos = [
    "Microsoft",
    "Cisco",
    "HPE",
    "Dell Technologies",
    "VMware",
    "Fortinet",
    "Oracle",
    "AWS",
  ] as const;

  const hiringSteps = [
    "Introductory conversation to understand fit and motivation.",
    "Technical discussion focused on real-world scenarios.",
    "Team conversation and cultural fit review.",
    "Transparent offer and onboarding details.",
  ] as const;

  return (
    <>
      {/* Hero kept unchanged */}
      <section className="hidden md:block relative isolate min-h-[42rem] overflow-hidden bg-[radial-gradient(circle_at_50%_49%,color-mix(in_srgb,var(--color-blue-500)_24%,transparent),transparent_17rem),linear-gradient(180deg,var(--color-navy-950),var(--color-navy-900))] py-14 sm:min-h-[46rem] sm:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-80 [background-image:linear-gradient(rgb(131_185_255_/_7%)_1px,transparent_1px),linear-gradient(90deg,rgb(131_185_255_/_7%)_1px,transparent_1px)] [background-size:2.5rem_2.5rem] [mask-image:radial-gradient(circle_at_center,black,transparent_73%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-[18%] bottom-20 h-64 rounded-full border border-blue-300/25 [transform:perspective(800px)_rotateX(66deg)] shadow-[0_0_36px_rgb(47_130_245_/_28%),inset_0_0_32px_rgb(47_130_245_/_14%)]" />
        <Container size="wide" className="relative grid min-h-[34rem] place-items-center text-center">
          <motion.div initial={reducedMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }} className="relative z-10 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Careers at InnovGen</p>
            <h1 className="mt-4 text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.05em]">Build Your Career in Enterprise Technology</h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-blue-100 sm:text-lg">Join InnovGen&apos;s engineering, cloud and infrastructure teams to work on enterprise IT, cloud infrastructure, cybersecurity, networking and managed services across the UAE.</p>
          </motion.div>

          <motion.div aria-hidden="true" initial={reducedMotion ? false : { opacity: 0, scale: 0.75 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: reducedMotion ? 0 : 0.8, delay: reducedMotion ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }} className="absolute top-[48%] grid size-44 place-items-center rounded-full border border-blue-300/45 bg-[radial-gradient(circle_at_36%_30%,rgb(131_185_255_/_35%),rgb(13_32_58_/_82%)_48%,var(--color-navy-950)_76%)] shadow-[0_0_44px_rgb(47_130_245_/_48%),inset_0_0_30px_rgb(131_185_255_/_25%)] sm:size-56">
            <span className="size-[78%] rounded-full border border-blue-300/40 [background-image:radial-gradient(circle_at_25%_36%,rgb(131_185_255_/_72%)_0_1px,transparent_2px),radial-gradient(circle_at_70%_25%,rgb(131_185_255_/_62%)_0_1px,transparent_2px),radial-gradient(circle_at_58%_72%,rgb(131_185_255_/_62%)_0_1px,transparent_2px)] [background-size:18px_18px]" />
          </motion.div>
        </Container>
      </section>

      <main aria-labelledby="careers-heading" className="bg-white text-slate-900">
        <h2 id="careers-heading" className="sr-only">Careers</h2>

        {/* Why InnovGen — 3D network */}
        <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f5f9ff_100%)] py-16 sm:py-24 lg:py-28">
          <div aria-hidden="true" className="absolute inset-0 [background-image:radial-gradient(circle_at_20%_20%,rgb(37_99_235_/_8%)_0_1px,transparent_1.5px)] [background-size:34px_34px]" />
          <Container size="wide">
            <motion.section {...sectionMotion} aria-labelledby="why-innovgen" className="relative grid items-center gap-12 overflow-hidden rounded-[2.25rem] border border-blue-100/80 bg-white p-7 shadow-[0_32px_90px_rgb(30_64_175_/_12%)] sm:p-10 lg:grid-cols-[0.95fr_1.05fr] lg:p-14">
              <div className="relative z-10">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700 sm:text-sm">Why InnovGen</p>
                <h2 id="why-innovgen" className="mt-4 max-w-[13ch] text-[clamp(2.25rem,4.8vw,4.4rem)] font-semibold leading-[0.98] tracking-[-0.055em]">Work on technology that keeps organizations moving.</h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">InnovGen solves real enterprise problems with secure, scalable platforms. Our teams focus on cloud infrastructure, cybersecurity, network engineering and digital transformation — giving you exposure to high-impact projects and modern technology stacks across the UAE.</p>
              </div>

              <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
                <div aria-hidden="true" className="absolute inset-[8%] rounded-full border border-blue-200/70 shadow-[0_0_60px_rgb(37_99_235_/_15%)]" />
                <motion.div
                  aria-hidden="true"
                  animate={reducedMotion ? undefined : { rotate: 360 }}
                  transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[15%] rounded-full border border-dashed border-blue-300/80"
                />
                <motion.div
                  aria-hidden="true"
                  animate={reducedMotion ? undefined : { rotate: -360 }}
                  transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[28%] rounded-full border border-blue-200/90"
                />
                <div className="absolute inset-[34%] grid place-items-center rounded-full border border-blue-200 bg-[radial-gradient(circle_at_35%_30%,#dbeafe,#1d4ed8_68%,#0f172a_100%)] text-center text-white shadow-[0_26px_70px_rgb(37_99_235_/_34%),inset_0_1px_1px_rgb(255_255_255_/_45%)]">
                  <span className="text-sm font-bold tracking-[0.18em] sm:text-base">INNOVGEN</span>
                </div>
                {["Cloud", "Cybersecurity", "Networking", "Infrastructure"].map((label, index) => {
                  const positions = ["left-1/2 top-[2%] -translate-x-1/2", "right-[2%] top-1/2 -translate-y-1/2", "bottom-[2%] left-1/2 -translate-x-1/2", "left-[2%] top-1/2 -translate-y-1/2"];
                  return (
                    <motion.div
                      key={label}
                      animate={reducedMotion ? undefined : { y: [0, -7, 0] }}
                      transition={{ duration: 4 + index * 0.45, repeat: Infinity, ease: "easeInOut" }}
                      className={cn("absolute rounded-full border border-blue-200 bg-white/95 px-4 py-2 text-xs font-semibold text-slate-800 shadow-[0_12px_32px_rgb(30_64_175_/_15%)] backdrop-blur sm:text-sm", positions[index])}
                    >
                      {label}
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>
          </Container>
        </section>

        {/* Life at InnovGen — image + floating cards */}
        <section className="relative overflow-hidden bg-[linear-gradient(145deg,var(--color-navy-950),#0b2241)] py-16 text-white sm:py-24 lg:py-28">
          <div aria-hidden="true" className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgb(96_165_250_/_7%)_1px,transparent_1px),linear-gradient(90deg,rgb(96_165_250_/_7%)_1px,transparent_1px)] [background-size:52px_52px]" />
          <Container size="wide">
            <motion.section {...sectionMotion} aria-labelledby="life-at-innovgen" className="relative grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent sm:text-sm">Life at InnovGen</p>
                <h2 id="life-at-innovgen" className="mt-4 max-w-[15ch] text-[clamp(2.25rem,4.6vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.055em]">Grow technical depth with a team that shares what it knows.</h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-blue-100/80 sm:text-lg sm:leading-8">We foster a culture of learning, ownership and cross-discipline collaboration. Expect mentorship, knowledge-sharing, and practical upskilling that helps you grow technical depth in cloud, virtualization, and enterprise networking.</p>
                <p className="mt-3 text-sm text-blue-100/75 sm:hidden">Mentorship, knowledge-sharing and practical upskilling in cloud, virtualization and networking.</p>
              </div>

              <div className="relative min-h-[25rem] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_30%_25%,rgb(59_130_246_/_35%),transparent_28%),linear-gradient(145deg,#102b4d,#071423)] p-6 shadow-[0_30px_80px_rgb(2_8_23_/_35%)] sm:min-h-[32rem] sm:p-8">
                <div aria-hidden="true" className="absolute inset-0 opacity-80 [background-image:radial-gradient(circle_at_30%_35%,rgb(147_197_253_/_50%)_0_1px,transparent_1.5px),radial-gradient(circle_at_68%_62%,rgb(147_197_253_/_38%)_0_1px,transparent_1.5px)] [background-size:48px_48px,74px_74px]" />
                <div className="absolute inset-x-[12%] bottom-[12%] h-44 rounded-[50%] border border-blue-300/25 [transform:perspective(700px)_rotateX(68deg)] shadow-[0_0_44px_rgb(59_130_246_/_26%)]" />
                <div className="absolute left-1/2 top-1/2 grid size-40 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-blue-300/35 bg-blue-500/10 shadow-[0_0_70px_rgb(59_130_246_/_30%)] backdrop-blur-xl sm:size-52">
                  <UsersRound className="size-16 text-blue-200 sm:size-20" aria-hidden="true" />
                </div>
                {["Mentorship", "Cloud", "Cybersecurity", "Learning"].map((label, index) => {
                  const positions = ["left-[7%] top-[12%]", "right-[6%] top-[18%]", "bottom-[10%] right-[8%]", "bottom-[15%] left-[8%]"];
                  return (
                    <motion.div
                      key={label}
                      animate={reducedMotion ? undefined : { y: [0, -10, 0], rotate: [0, index % 2 ? 1.5 : -1.5, 0] }}
                      transition={{ duration: 4.5 + index * 0.4, repeat: Infinity, ease: "easeInOut" }}
                      className={cn("absolute rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_44px_rgb(2_8_23_/_25%)] backdrop-blur-xl", positions[index])}
                    >
                      <span className="mr-2 text-blue-300">✓</span>{label}
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>
          </Container>
        </section>

       

        {/* Application form kept unchanged */}
        <CareersApplicationForm />

        {/* Benefits — circular timeline */}
        <section className="relative overflow-hidden bg-white py-16 sm:py-24 lg:py-28">
          <Container size="wide">
            <motion.section {...sectionMotion} aria-labelledby="benefits" className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700 sm:text-sm">Benefits</p>
                <h2 id="benefits" className="mt-4 max-w-[14ch] text-[clamp(2.25rem,4.6vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.055em]">A career designed to deepen your impact.</h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">Our benefits support learning, wellbeing and flexible work where appropriate. InnovGen invests in training, certification and a collaborative environment where engineering quality matters.</p>
                <div className="mt-6 space-y-4 sm:hidden">
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">Flexible working models and practical upskilling to keep your skills current.</div>
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">A collaborative team, mentoring and clear expectations for every role.</div>
                </div>
              </div>

              <div className="relative mx-auto hidden aspect-square w-full max-w-[36rem] place-items-center md:grid">
                <div aria-hidden="true" className="absolute inset-[9%] rounded-full border border-blue-100" />
                <div aria-hidden="true" className="absolute inset-[25%] rounded-full border border-dashed border-blue-200" />
                <div className="absolute inset-[34%] grid place-items-center rounded-full bg-[linear-gradient(145deg,#eff6ff,#ffffff)] text-center shadow-[0_20px_60px_rgb(30_64_175_/_14%)]">
                  <span className="max-w-[8rem] text-lg font-semibold leading-6 text-slate-900">Your growth at InnovGen</span>
                </div>
                {[[GraduationCap, "Learn continuously", "left-1/2 top-0 -translate-x-1/2"], [UsersRound, "Build together", "right-0 top-1/2 -translate-y-1/2"], [HeartHandshake, "Work with purpose", "bottom-0 left-1/2 -translate-x-1/2"]].map(([Icon, label, position], index) => {
                  const BenefitIcon = Icon as typeof GraduationCap;
                  return (
                    <motion.div
                      key={label as string}
                      animate={reducedMotion ? undefined : { y: [0, -8, 0] }}
                      transition={{ duration: 4 + index * 0.5, repeat: Infinity, ease: "easeInOut" }}
                      className={cn("absolute w-44 rounded-[1.5rem] border border-slate-200 bg-white p-5 text-center shadow-[0_16px_44px_rgb(15_23_42_/_10%)]", position as string)}
                    >
                      <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-blue-50 text-blue-700"><BenefitIcon className="size-6" aria-hidden="true" /></span>
                      <h3 className="mt-4 text-base font-semibold text-slate-950">{label as string}</h3>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>
          </Container>
        </section>

        {/* Technology We Use — animated logos */}
        <section className="overflow-hidden bg-[linear-gradient(180deg,#f8fbff,#eef5ff)] py-16 sm:py-24 lg:py-28">
          <Container size="wide">
            <motion.section {...sectionMotion} aria-labelledby="technology-we-use">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700 sm:text-sm">Technology We Use</p>
                <h2 id="technology-we-use" className="mt-4 text-[clamp(2.25rem,4.6vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.055em]">Enterprise platforms behind modern infrastructure.</h2>
              </div>
              <div className="relative mt-10 overflow-hidden rounded-[2rem] border border-blue-100 bg-white py-6 shadow-[0_24px_70px_rgb(30_64_175_/_10%)] sm:py-8">
                <div aria-hidden="true" className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
                <div aria-hidden="true" className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />
                <motion.div
                  animate={reducedMotion ? undefined : { x: ["0%", "-50%"] }}
                  transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
                  className="flex w-max gap-4 px-4"
                >
                  {[...technologyLogos, ...technologyLogos].map((logo, index) => (
                    <div key={`${logo}-${index}`} className="grid h-24 w-52 shrink-0 place-items-center rounded-2xl border border-slate-200 bg-slate-50/70 px-6 text-center text-base font-semibold tracking-[-0.02em] text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-white hover:text-blue-700">
                      {logo}
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.section>
          </Container>
        </section>

        {/* Hiring process — connected pipeline */}
        <section className="relative overflow-hidden bg-[linear-gradient(145deg,var(--color-navy-950),var(--color-navy-900))] py-16 text-white sm:py-24 lg:py-28">
          <div aria-hidden="true" className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgb(96_165_250_/_8%)_1px,transparent_1px),linear-gradient(90deg,rgb(96_165_250_/_8%)_1px,transparent_1px)] [background-size:48px_48px]" />
          <Container size="wide">
            <motion.section {...sectionMotion} aria-labelledby="hiring-process" className="relative">
              <div className="max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent sm:text-sm">Hiring process</p>
                <h2 id="hiring-process" className="mt-4 max-w-[15ch] text-[clamp(2.25rem,4.6vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.055em]">Straightforward conversations, clear next steps.</h2>
              </div>

              <ol className="relative mt-12 grid gap-5 md:grid-cols-4">
                <div aria-hidden="true" className="absolute left-[12%] right-[12%] top-8 hidden h-px bg-gradient-to-r from-transparent via-blue-300/55 to-transparent md:block" />
                {hiringSteps.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: reducedMotion ? 0 : 0.48, delay: reducedMotion ? 0 : index * 0.08 }}
                    className="relative rounded-[1.75rem] border border-white/10 bg-white/[0.065] p-6 shadow-[0_20px_55px_rgb(2_8_23_/_28%)] backdrop-blur-xl"
                  >
                    <span className="relative z-10 grid size-16 place-items-center rounded-full border border-blue-300/40 bg-blue-500/15 text-sm font-bold text-blue-100 shadow-[0_0_32px_rgb(59_130_246_/_25%)]">0{index + 1}</span>
                    <p className="mt-8 text-base font-semibold leading-7 text-white">{item}</p>
                  </motion.li>
                ))}
              </ol>
            </motion.section>
          </Container>
        </section>

        {/* FAQ kept unchanged */}
        <Container size="wide">
          <motion.section aria-labelledby="faq" className="mt-16 rounded-[2rem] bg-[linear-gradient(145deg,var(--color-navy-950),var(--color-navy-900))] p-6 text-white sm:mt-24 sm:p-10 lg:p-12">
            <motion.div initial={reducedMotion ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: reducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Frequently asked questions</p>
              <h2 id="faq" className="mt-4 max-w-[12ch] text-[clamp(2.3rem,4vw,4rem)] font-semibold leading-[0.96] tracking-[-0.055em]">Clear answers for your next move.</h2>
              <FaqAccordion items={careerFaqItems} idPrefix="career-faq" />
            </motion.div>
          </motion.section>

          {/* Final CTA kept unchanged */}
          <motion.section aria-labelledby="join" initial={reducedMotion ? false : { opacity: 0, y: 28, scale: 0.995 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: reducedMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }} className="py-10 sm:py-14">
           
          </motion.section>
        </Container>
      </main>
    </>
  );
}