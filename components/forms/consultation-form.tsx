"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Mail, MessageSquareText, Phone, UserRound } from "lucide-react";
import { motion } from "motion/react";
import { LiquidSubmitButton } from "@/components/forms/liquid-submit-button";
import { SuccessPopup } from "@/components/ui/success-popup";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";

const consultationSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name.").max(120),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  phone: z.string().trim().regex(/^\+?[0-9\s\-()]{7,20}$/, "Enter a valid phone number."),
  subject: z.string().trim().min(3, "Enter a subject.").max(160),
  message: z.string().trim().min(10, "Please add a little more detail.").max(4000),
});

type ConsultationValues = z.infer<typeof consultationSchema>;
type SubmitState = "idle" | "submitting" | "completing" | "success" | "error";

const fieldClass =
  "mt-2 min-h-14 w-full rounded-[1rem] border border-blue-100/15 bg-navy-950/75 px-4 py-3 text-[0.95rem] text-foreground placeholder:text-muted/50 shadow-[inset_0_1px_0_rgb(255_255_255_/_5%),0_12px_24px_rgb(0_0_0_/_12%)] transition-[border-color,box-shadow,background-color] duration-[var(--duration-standard)] focus:border-blue-200/80 focus:bg-navy-950 focus:outline-none focus:ring-4 focus:ring-blue-500/15";

const fieldWrapperClass =
  "group rounded-[1.15rem] border border-transparent p-3 transition-[border-color,background-color] duration-[var(--duration-standard)] focus-within:border-blue-200/20 focus-within:bg-blue-500/[0.035]";

export function ConsultationForm() {
  const reducedMotion = usePrefersReducedMotion();
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ConsultationValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "" },
  });

  async function onSubmit(values: ConsultationValues) {
    setSubmitState("submitting");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const payload = (await response.json()) as { message?: string; success?: boolean };

      if (!response.ok || !payload.success) {
        throw new Error(payload.message ?? "We could not send your enquiry. Please try again.");
      }

      reset();
      setSubmitState("completing");
      await new Promise((resolve) =>
        window.setTimeout(resolve, reducedMotion ? 120 : 900),
      );
      setSubmitState("success");
    } catch (error) {
      setSubmitState("error");
      setSubmitMessage(error instanceof Error ? error.message : "We could not send your enquiry. Please try again.");
    }
  }

  return (
    <>
      <SuccessPopup
        open={submitState === "success"}
        title="Your enquiry has been sent."
        description="Thank you for reaching out. Our team will review your message and get back to you soon."
        onClose={() => setSubmitState("idle")}
      />
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        initial={reducedMotion ? false : { opacity: 0, y: 18, rotateX: -3 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.48, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
        style={{ transformPerspective: 1000 }}
      >
        <div className="mb-7 flex items-start gap-4 border-b border-blue-200/15 pb-6">
          <span aria-hidden="true" className="grid size-11 shrink-0 place-items-center rounded-2xl border border-blue-200/25 bg-blue-500/10 text-blue-200 shadow-[0_12px_28px_rgb(21_105_224_/_15%)]">
            <MessageSquareText className="size-5" />
          </span>
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-blue-200">Start a conversation</p>
            <p className="mt-1 text-sm leading-6 text-muted">Share the essentials and we will prepare the right next step.</p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          <motion.div initial={reducedMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reducedMotion ? 0 : 0.08, duration: 0.32 }} className={fieldWrapperClass}>
            <label className="text-sm font-semibold text-blue-50/90" htmlFor="name">Full name <span aria-hidden="true">*</span></label>
            <div className="relative"><UserRound aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-blue-200/80" /><input {...register("name")} className={`${fieldClass} pl-11`} id="name" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} /></div>
            {errors.name ? <p id="name-error" className="mt-2 text-sm text-red-300">{errors.name.message}</p> : null}
          </motion.div>
          <motion.div initial={reducedMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reducedMotion ? 0 : 0.13, duration: 0.32 }} className={fieldWrapperClass}>
            <label className="text-sm font-semibold text-blue-50/90" htmlFor="email">Email <span aria-hidden="true">*</span></label>
            <div className="relative"><Mail aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-blue-200/80" /><input {...register("email")} className={`${fieldClass} pl-11`} id="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} /></div>
            {errors.email ? <p id="email-error" className="mt-2 text-sm text-red-300">{errors.email.message}</p> : null}
          </motion.div>
          <motion.div initial={reducedMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reducedMotion ? 0 : 0.18, duration: 0.32 }} className={fieldWrapperClass}>
            <label className="text-sm font-semibold text-blue-50/90" htmlFor="phone">Phone number <span aria-hidden="true">*</span></label>
            <div className="relative"><Phone aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-blue-200/80" /><input {...register("phone")} className={`${fieldClass} pl-11`} id="phone" type="tel" autoComplete="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} /></div>
            {errors.phone ? <p id="phone-error" className="mt-2 text-sm text-red-300">{errors.phone.message}</p> : null}
          </motion.div>
          <motion.div initial={reducedMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reducedMotion ? 0 : 0.23, duration: 0.32 }} className={fieldWrapperClass}>
            <label className="text-sm font-semibold text-blue-50/90" htmlFor="subject">Subject <span aria-hidden="true">*</span></label>
            <div className="relative"><MessageSquareText aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-blue-200/80" /><input {...register("subject")} className={`${fieldClass} pl-11`} id="subject" autoComplete="off" aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? "subject-error" : undefined} /></div>
            {errors.subject ? <p id="subject-error" className="mt-2 text-sm text-red-300">{errors.subject.message}</p> : null}
          </motion.div>
          <motion.div initial={reducedMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reducedMotion ? 0 : 0.28, duration: 0.32 }} className={`${fieldWrapperClass} sm:col-span-2`}>
            <label className="text-sm font-semibold text-blue-50/90" htmlFor="message">Message <span aria-hidden="true">*</span></label>
            <div className="relative"><MessageSquareText aria-hidden="true" className="pointer-events-none absolute left-4 top-5 size-4 text-blue-200/80" /><textarea {...register("message")} className={`${fieldClass} min-h-40 resize-y pl-11`} id="message" rows={5} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} /></div>
            {errors.message ? <p id="message-error" className="mt-2 text-sm text-red-300">{errors.message.message}</p> : null}
          </motion.div>
        </div>
        {submitState === "error" ? <p role="alert" className="mt-5 rounded-lg border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">{submitMessage}</p> : null}
        <LiquidSubmitButton
          state={
            submitState === "submitting"
              ? "loading"
              : submitState === "completing" || submitState === "success"
                ? "complete"
                : "idle"
          }
        />
      </motion.form>
    </>
  );
}
