"use client";

import { useId, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type NewsletterState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export function NewsletterForm() {
  const inputId = useId();
  const messageId = useId();
  const [state, setState] = useState<NewsletterState>({ status: "idle" });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("newsletter-email") ?? "").trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState({
        status: "error",
        message: "Enter a valid email address, such as name@company.com.",
      });
      return;
    }

    if (email.toLowerCase().includes("error")) {
      setState({
        status: "error",
        message:
          "Mock submission could not be completed. Try another address.",
      });
      return;
    }

    setState({
      status: "success",
      message:
        "Mock subscription complete. No data was sent; backend integration is planned for phase two.",
    });
    form.reset();
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor={inputId} className="font-semibold">
        Work email
      </label>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <input
          id={inputId}
          name="newsletter-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          aria-invalid={state.status === "error"}
          aria-describedby={messageId}
          placeholder="name@company.com"
          className="min-h-12 min-w-0 flex-1 rounded-full border border-border bg-background px-5 text-foreground placeholder:text-muted/70 focus:border-blue-300"
        />
        <Button type="submit" className="shrink-0">
          Subscribe
        </Button>
      </div>
      <div
        id={messageId}
        role={state.status === "error" ? "alert" : "status"}
        aria-live="polite"
        className={state.status === "error" ? "mt-3 text-sm text-red-300" : "mt-3 text-sm text-muted"}
      >
        {state.status === "success" ? (
          <span className="inline-flex items-start gap-2 text-blue-300">
            <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            {state.message}
          </span>
        ) : state.status === "error" ? (
          state.message
        ) : (
          "By subscribing, you agree to the provisional privacy notice. Backend submission is pending phase two."
        )}
      </div>
    </form>
  );
}
