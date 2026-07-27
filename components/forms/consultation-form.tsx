"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { SuccessPopup } from "@/components/ui/success-popup";

const consultationSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name.").max(120),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  phone: z.string().trim().regex(/^[+()\d\s-]{7,24}$/, "Enter a valid phone number.").max(24),
  subject: z.string().trim().min(3, "Enter a subject.").max(160),
  message: z.string().trim().min(10, "Please add a little more detail.").max(4000),
});

type ConsultationValues = z.infer<typeof consultationSchema>;
type SubmitState = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "mt-2 min-h-12 w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted/70 transition-colors focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300/20";

export function ConsultationForm() {
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
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="font-semibold" htmlFor="name">Full name <span aria-hidden="true">*</span></label>
          <input {...register("name")} className={fieldClass} id="name" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
          {errors.name ? <p id="name-error" className="mt-2 text-sm text-red-300">{errors.name.message}</p> : null}
        </div>
        <div>
          <label className="font-semibold" htmlFor="email">Email <span aria-hidden="true">*</span></label>
          <input {...register("email")} className={fieldClass} id="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
          {errors.email ? <p id="email-error" className="mt-2 text-sm text-red-300">{errors.email.message}</p> : null}
        </div>
        <div>
          <label className="font-semibold" htmlFor="phone">Phone number <span aria-hidden="true">*</span></label>
          <input {...register("phone")} className={fieldClass} id="phone" type="tel" autoComplete="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} />
          {errors.phone ? <p id="phone-error" className="mt-2 text-sm text-red-300">{errors.phone.message}</p> : null}
        </div>
        <div>
          <label className="font-semibold" htmlFor="subject">Subject <span aria-hidden="true">*</span></label>
          <input {...register("subject")} className={fieldClass} id="subject" autoComplete="off" aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? "subject-error" : undefined} />
          {errors.subject ? <p id="subject-error" className="mt-2 text-sm text-red-300">{errors.subject.message}</p> : null}
        </div>
        <div className="sm:col-span-2">
          <label className="font-semibold" htmlFor="message">Message <span aria-hidden="true">*</span></label>
          <textarea {...register("message")} className={`${fieldClass} min-h-36 resize-y`} id="message" rows={5} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} />
          {errors.message ? <p id="message-error" className="mt-2 text-sm text-red-300">{errors.message.message}</p> : null}
        </div>
      </div>
      {submitState === "error" ? <p role="alert" className="mt-5 rounded-lg border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">{submitMessage}</p> : null}
      <Button type="submit" size="lg" className="mt-7 w-full sm:w-auto" loading={submitState === "submitting"} loadingLabel="Sending enquiry">Submit enquiry</Button>
      </form>
    </>
  );
}
