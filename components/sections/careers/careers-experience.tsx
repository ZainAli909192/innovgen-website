"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check, Send } from "lucide-react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SuccessPopup } from "@/components/ui/success-popup";
import { cn } from "@/lib/utils";

const number = "" as const;

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

  return (
    <>
      <section className="hidden md:block relative isolate min-h-[42rem] overflow-hidden bg-[radial-gradient(circle_at_50%_49%,color-mix(in_srgb,var(--color-blue-500)_24%,transparent),transparent_17rem),linear-gradient(180deg,var(--color-navy-950),var(--color-navy-900))] py-14 sm:min-h-[46rem] sm:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-80 [background-image:linear-gradient(rgb(131_185_255_/_7%)_1px,transparent_1px),linear-gradient(90deg,rgb(131_185_255_/_7%)_1px,transparent_1px)] [background-size:2.5rem_2.5rem] [mask-image:radial-gradient(circle_at_center,black,transparent_73%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-[18%] bottom-20 h-64 rounded-full border border-blue-300/25 [transform:perspective(800px)_rotateX(66deg)] shadow-[0_0_36px_rgb(47_130_245_/_28%),inset_0_0_32px_rgb(47_130_245_/_14%)]" />
        <Container size="wide" className="relative grid min-h-[34rem] place-items-center text-center">
          <motion.div initial={reducedMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }} className="relative z-10 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Careers at InnovGen</p>
            <h1 className="mt-4 text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.05em]">Your next mission starts here.</h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-blue-100 sm:text-lg">Join InnovGen and help shape thoughtful technology solutions for a better tomorrow.</p>
          </motion.div>

          <motion.div aria-hidden="true" initial={reducedMotion ? false : { opacity: 0, scale: 0.75 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: reducedMotion ? 0 : 0.8, delay: reducedMotion ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }} className="absolute top-[48%] grid size-44 place-items-center rounded-full border border-blue-300/45 bg-[radial-gradient(circle_at_36%_30%,rgb(131_185_255_/_35%),rgb(13_32_58_/_82%)_48%,var(--color-navy-950)_76%)] shadow-[0_0_44px_rgb(47_130_245_/_48%),inset_0_0_30px_rgb(131_185_255_/_25%)] sm:size-56">
            <span className="size-[78%] rounded-full border border-blue-300/40 [background-image:radial-gradient(circle_at_25%_36%,rgb(131_185_255_/_72%)_0_1px,transparent_2px),radial-gradient(circle_at_70%_25%,rgb(131_185_255_/_62%)_0_1px,transparent_2px),radial-gradient(circle_at_58%_72%,rgb(131_185_255_/_62%)_0_1px,transparent_2px)] [background-size:18px_18px]" />
          </motion.div>

        </Container>
      </section>
      <CareersApplicationForm />
    </>
  );
}
