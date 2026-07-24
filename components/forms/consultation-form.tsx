"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type FormState = "idle" | "submitting" | "success";

const fieldClass =
  "mt-2 min-h-12 w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted/70 focus:border-blue-300";

export function ConsultationForm() {
  const [state, setState] = useState<FormState>("idle");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    window.setTimeout(() => setState("success"), 650);
  }

  if (state === "success") {
    return (
      <Card role="status" className="py-12 text-center">
        <CheckCircle2 aria-hidden="true" className="mx-auto size-10 text-blue-300" />
        <h2 className="mt-5 text-2xl">Your enquiry was captured locally</h2>
        <p className="mx-auto mt-3 max-w-lg text-muted">
          This is a static frontend demonstration. No information was sent.
          Submission handling and response details require client approval.
        </p>
        <Button className="mt-6" variant="secondary" onClick={() => setState("idle")}>
          Start another enquiry
        </Button>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} aria-describedby="form-notice">
      <p id="form-notice" className="mb-6 rounded-lg border border-gold-300/25 bg-gold-500/10 p-4 text-sm text-accent">
        Static prototype: no data is transmitted. Contact details and backend
        workflow require client approval.
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="font-semibold" htmlFor="name">Full name <span aria-hidden="true">*</span></label>
          <input className={fieldClass} id="name" name="name" autoComplete="name" required />
        </div>
        <div>
          <label className="font-semibold" htmlFor="email">Work email <span aria-hidden="true">*</span></label>
          <input className={fieldClass} id="email" name="email" type="email" autoComplete="email" required />
        </div>
        <div>
          <label className="font-semibold" htmlFor="company">Company</label>
          <input className={fieldClass} id="company" name="company" autoComplete="organization" />
        </div>
        <div>
          <label className="font-semibold" htmlFor="service">Area of interest <span aria-hidden="true">*</span></label>
          <select className={fieldClass} id="service" name="service" required defaultValue="">
            <option value="" disabled>Select an area</option>
            <option>Software development</option>
            <option>AI and automation</option>
            <option>Cloud and cybersecurity</option>
            <option>Digital product</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="font-semibold" htmlFor="timeline">Indicative timeline</label>
          <select className={fieldClass} id="timeline" name="timeline" defaultValue="">
            <option value="">Not decided</option>
            <option>Within 3 months</option>
            <option>3–6 months</option>
            <option>6–12 months</option>
            <option>Exploring options</option>
          </select>
        </div>
        <div>
          <label className="font-semibold" htmlFor="budget">Indicative budget</label>
          <select className={fieldClass} id="budget" name="budget" defaultValue="">
            <option value="">Prefer to discuss</option>
            <option>Range pending client approval</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="font-semibold" htmlFor="message">What outcome are you working toward? <span aria-hidden="true">*</span></label>
          <textarea className={`${fieldClass} min-h-36`} id="message" name="message" required rows={5} />
          <p className="mt-2 text-sm text-muted">Please do not include confidential or sensitive information.</p>
        </div>
      </div>
      <label className="mt-6 flex items-start gap-3 text-sm text-muted">
        <input className="mt-1 size-5 accent-[var(--primary)]" type="checkbox" required />
        <span>I agree to be contacted about this enquiry. Privacy wording requires client approval.</span>
      </label>
      <Button type="submit" size="lg" className="mt-7 w-full sm:w-auto" loading={state === "submitting"} loadingLabel="Preparing enquiry">
        Submit enquiry
      </Button>
    </form>
  );
}
