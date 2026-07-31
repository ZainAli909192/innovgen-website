"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Mail,
  MessageSquareText,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { motion } from "motion/react";

import { LiquidSubmitButton } from "@/components/forms/liquid-submit-button";
import { usePrefersReducedMotion } from "@/components/providers/motion-provider";
import { SuccessPopup } from "@/components/ui/success-popup";

const consultationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(120),

  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(254),

  phone: z
    .string()
    .trim()
    .regex(
      /^\+?[0-9\s\-()]{7,20}$/,
      "Enter a valid phone number.",
    ),

  subject: z
    .string()
    .trim()
    .min(3, "Enter a subject.")
    .max(160),

  message: z
    .string()
    .trim()
    .min(10, "Please add a little more detail.")
    .max(4000),
});

type ConsultationValues =
  z.infer<typeof consultationSchema>;

type SubmitState =
  | "idle"
  | "submitting"
  | "completing"
  | "success"
  | "error";

const fieldClass = `
  mt-2
  min-h-14
  w-full
  rounded-2xl
  border
  border-slate-200
  bg-slate-50
  px-4
  py-3
  text-[0.95rem]
  text-slate-950
  outline-none
  placeholder:text-slate-400
  shadow-[inset_0_1px_0_rgb(255_255_255_/_90%),0_8px_20px_rgb(15_23_42_/_5%)]
  transition-[border-color,box-shadow,background-color]
  duration-300

  hover:border-blue-300
  hover:bg-white

  focus:border-blue-500
  focus:bg-white
  focus:ring-4
  focus:ring-blue-500/10

  lg:border-blue-100/15
  lg:bg-navy-950/75
  lg:text-foreground
  lg:placeholder:text-blue-950
  lg:shadow-[inset_0_1px_0_rgb(255_255_255_/_5%),0_12px_24px_rgb(0_0_0_/_12%)]

  lg:hover:border-blue-200/40
  lg:hover:bg-navy-950

  lg:focus:border-blue-200/80
  lg:focus:bg-navy-950
  lg:focus:ring-blue-500/15
`;

const fieldWrapperClass = `
  group
  rounded-[1.25rem]
  border
  border-transparent
  p-1
  transition-[border-color,background-color]
  duration-300

  focus-within:border-blue-100
  focus-within:bg-blue-50/60

  lg:p-3
  lg:focus-within:border-blue-200/20
  lg:focus-within:bg-blue-500/[0.035]
`;

const labelClass = `
  text-sm
  font-semibold
  text-slate-700

  lg:text-blue-50/90
`;

const iconClass = `
  pointer-events-none
  absolute
  left-4
  top-1/2
  size-4
  -translate-y-1/2
  text-slate-400
  transition-colors
  duration-300

  group-focus-within:text-blue-600

  lg:text-blue-200/80
  lg:group-focus-within:text-blue-200
`;

const errorClass = `
  mt-2
  flex
  items-center
  gap-1.5
  text-sm
  font-medium
  text-red-600

  lg:text-red-300
`;

export function ConsultationForm() {
  const reducedMotion =
    usePrefersReducedMotion();

  const [submitState, setSubmitState] =
    useState<SubmitState>("idle");

  const [submitMessage, setSubmitMessage] =
    useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ConsultationValues>({
    resolver: zodResolver(
      consultationSchema,
    ),

    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(
    values: ConsultationValues,
  ) {
    setSubmitState("submitting");
    setSubmitMessage("");

    try {
      const response = await fetch(
        "/api/consultation",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(values),
        },
      );

      const payload =
        (await response.json()) as {
          message?: string;
          success?: boolean;
        };

      if (
        !response.ok ||
        !payload.success
      ) {
        throw new Error(
          payload.message ??
            "We could not send your enquiry. Please try again.",
        );
      }

      reset();
      setSubmitState("completing");

      await new Promise((resolve) =>
        window.setTimeout(
          resolve,
          reducedMotion ? 120 : 900,
        ),
      );

      setSubmitState("success");
    } catch (error) {
      setSubmitState("error");

      setSubmitMessage(
        error instanceof Error
          ? error.message
          : "We could not send your enquiry. Please try again.",
      );
    }
  }

  return (
    <>
      <SuccessPopup
        open={submitState === "success"}
        title="Your enquiry has been sent."
        description="Thank you for reaching out. Our team will review your message and get back to you soon."
        onClose={() =>
          setSubmitState("idle")
        }
      />

      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        initial={
          reducedMotion
            ? false
            : {
                opacity: 0,
                y: 18,
                rotateX: -3,
              }
        }
        animate={{
          opacity: 1,
          y: 0,
          rotateX: 0,
        }}
        transition={{
          duration: reducedMotion
            ? 0
            : 0.48,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          relative
          overflow-hidden
          rounded-[1.75rem]
          border
          border-slate-200
          bg-white
          p-5
          text-slate-950
          shadow-[0_24px_70px_rgb(15_23_42_/_12%)]

          sm:p-7

          lg:overflow-visible
          lg:rounded-none
          lg:border-0
          lg:bg-transparent
          lg:p-0
          lg:text-white
          lg:shadow-none
        "
        style={{
          transformPerspective: 1000,
        }}
      >
        {/* Mobile decorative glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-16
            -top-20
            size-52
            rounded-full
            bg-blue-100/70
            blur-3xl

            lg:hidden
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -bottom-20
            -left-20
            size-48
            rounded-full
            bg-cyan-100/60
            blur-3xl

            lg:hidden
          "
        />

        {/* Form heading */}
        <div
          className="
            relative
            mb-7
            flex
            items-start
            gap-4
            border-b
            border-slate-200
            pb-6

            lg:border-blue-200/15
          "
        >
          <span
            aria-hidden="true"
            className="
              grid
              size-12
              shrink-0
              place-items-center
              rounded-2xl
              border
              border-blue-100
              bg-blue-50
              text-blue-600
              shadow-[0_10px_24px_rgb(37_99_235_/_12%)]

              lg:size-11
              lg:border-blue-200/25
              lg:bg-blue-500/10
              lg:text-blue-200
              lg:shadow-[0_12px_28px_rgb(21_105_224_/_15%)]
            "
          >
            <MessageSquareText className="size-5" />
          </span>

          <div className="min-w-0">
            <p
              className="
                text-[0.68rem]
                font-bold
                uppercase
                tracking-[0.2em]
                text-blue-600

                lg:font-semibold
                lg:text-blue-200
              "
            >
              Start a conversation
            </p>

            <h2
              className="
                mt-2
                text-xl
                font-semibold
                tracking-[-0.025em]
                text-slate-950

                lg:hidden
              "
            >
              Tell us about your project
            </h2>

            <p
              className="
                mt-1.5
                max-w-md
                text-sm
                leading-6
                text-slate-500

                lg:mt-1
                lg:text-muted
              "
            >
              Share the essentials and
              we will prepare the right
              next step.
            </p>
          </div>
        </div>

        {/* Form fields */}
        <div
          className="
            relative
            grid
            gap-5

            sm:grid-cols-2
            sm:gap-x-4
            sm:gap-y-3
          "
        >
          {/* Full name */}
          <motion.div
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0,
                    y: 12,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: reducedMotion
                ? 0
                : 0.08,
              duration: 0.32,
            }}
            className={
              fieldWrapperClass
            }
          >
            <label
              className={labelClass}
              htmlFor="name"
            >
              Full name{" "}
              <span
                aria-hidden="true"
                className="text-blue-600 lg:text-blue-200"
              >
                *
              </span>
            </label>

            <div className="relative">
              <UserRound
                aria-hidden="true"
                className={iconClass}
              />

              <input
                {...register("name")}
                className={`${fieldClass} pl-11`}
                id="name"
                type="text"
                autoComplete="name"
                placeholder="Your full name"
                aria-invalid={Boolean(
                  errors.name,
                )}
                aria-describedby={
                  errors.name
                    ? "name-error"
                    : undefined
                }
              />
            </div>

            {errors.name ? (
              <p
                id="name-error"
                className={errorClass}
              >
                {errors.name.message}
              </p>
            ) : null}
          </motion.div>

          {/* Email */}
          <motion.div
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0,
                    y: 12,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: reducedMotion
                ? 0
                : 0.13,
              duration: 0.32,
            }}
            className={
              fieldWrapperClass
            }
          >
            <label
              className={labelClass}
              htmlFor="email"
            >
              Email{" "}
              <span
                aria-hidden="true"
                className="text-blue-600 lg:text-blue-200"
              >
                *
              </span>
            </label>

            <div className="relative">
              <Mail
                aria-hidden="true"
                className={iconClass}
              />

              <input
                {...register("email")}
                className={`${fieldClass} pl-11`}
                id="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder="name@company.com"
                aria-invalid={Boolean(
                  errors.email,
                )}
                aria-describedby={
                  errors.email
                    ? "email-error"
                    : undefined
                }
              />
            </div>

            {errors.email ? (
              <p
                id="email-error"
                className={errorClass}
              >
                {errors.email.message}
              </p>
            ) : null}
          </motion.div>

          {/* Phone */}
          <motion.div
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0,
                    y: 12,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: reducedMotion
                ? 0
                : 0.18,
              duration: 0.32,
            }}
            className={
              fieldWrapperClass
            }
          >
            <label
              className={labelClass}
              htmlFor="phone"
            >
              Phone number{" "}
              <span
                aria-hidden="true"
                className="text-blue-600 lg:text-blue-200"
              >
                *
              </span>
            </label>

            <div className="relative">
              <Phone
                aria-hidden="true"
                className={iconClass}
              />

              <input
                {...register("phone")}
                className={`${fieldClass} pl-11`}
                id="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="+971 50 000 0000"
                aria-invalid={Boolean(
                  errors.phone,
                )}
                aria-describedby={
                  errors.phone
                    ? "phone-error"
                    : undefined
                }
              />
            </div>

            {errors.phone ? (
              <p
                id="phone-error"
                className={errorClass}
              >
                {errors.phone.message}
              </p>
            ) : null}
          </motion.div>

          {/* Subject */}
          <motion.div
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0,
                    y: 12,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: reducedMotion
                ? 0
                : 0.23,
              duration: 0.32,
            }}
            className={
              fieldWrapperClass
            }
          >
            <label
              className={labelClass}
              htmlFor="subject"
            >
              Subject{" "}
              <span
                aria-hidden="true"
                className="text-blue-600 lg:text-blue-200"
              >
                *
              </span>
            </label>

            <div className="relative">
              <MessageSquareText
                aria-hidden="true"
                className={iconClass}
              />

              <input
                {...register("subject")}
                className={`${fieldClass} pl-11`}
                id="subject"
                type="text"
                autoComplete="off"
                placeholder="How can we help?"
                aria-invalid={Boolean(
                  errors.subject,
                )}
                aria-describedby={
                  errors.subject
                    ? "subject-error"
                    : undefined
                }
              />
            </div>

            {errors.subject ? (
              <p
                id="subject-error"
                className={errorClass}
              >
                {errors.subject.message}
              </p>
            ) : null}
          </motion.div>

          {/* Message */}
          <motion.div
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0,
                    y: 12,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: reducedMotion
                ? 0
                : 0.28,
              duration: 0.32,
            }}
            className={`${fieldWrapperClass} sm:col-span-2`}
          >
            <label
              className={labelClass}
              htmlFor="message"
            >
              Message{" "}
              <span
                aria-hidden="true"
                className="text-blue-600 lg:text-blue-200"
              >
                *
              </span>
            </label>

            <div className="relative">
              <MessageSquareText
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  left-4
                  top-5
                  size-4
                  text-slate-400
                  transition-colors
                  duration-300

                  group-focus-within:text-blue-600

                  lg:text-blue-200/80
                  lg:group-focus-within:text-blue-200
                "
              />

              <textarea
                {...register("message")}
                className={`
                  ${fieldClass}
                  min-h-40
                  resize-y
                  pl-11
                `}
                id="message"
                rows={5}
                placeholder="Tell us about your requirements, timeline and goals."
                aria-invalid={Boolean(
                  errors.message,
                )}
                aria-describedby={
                  errors.message
                    ? "message-error"
                    : undefined
                }
              />
            </div>

            {errors.message ? (
              <p
                id="message-error"
                className={errorClass}
              >
                {errors.message.message}
              </p>
            ) : null}
          </motion.div>
        </div>

        {/* Mobile trust note */}
        <div
          className="
            relative
            mt-6
            flex
            items-start
            gap-3
            rounded-2xl
            border
            border-blue-100
            bg-blue-50/80
            px-4
            py-3.5

            lg:hidden
          "
        >
          <span
            className="
              mt-0.5
              grid
              size-8
              shrink-0
              place-items-center
              rounded-full
              bg-white
              text-blue-600
              shadow-sm
            "
          >
            <ShieldCheck
              className="size-4"
              aria-hidden="true"
            />
          </span>

          <div>
            <p className="text-sm font-semibold text-slate-900">
              Your information is secure
            </p>

            <p className="mt-0.5 text-xs leading-5 text-slate-500">
              Your details are used only
              to respond to this enquiry.
            </p>
          </div>
        </div>

        {/* Submission error */}
        {submitState === "error" ? (
          <p
            role="alert"
            className="
              relative
              mt-5
              rounded-2xl
              border
              border-red-200
              bg-red-50
              px-4
              py-3
              text-sm
              font-medium
              text-red-700

              lg:rounded-lg
              lg:border-red-400/20
              lg:bg-red-500/10
              lg:text-red-200
            "
          >
            {submitMessage}
          </p>
        ) : null}

        {/* Submit button */}
        <div
          className="
            relative
            mt-6
            w-full

            [&>button]:w-full
            [&>button]:justify-center

            sm:[&>button]:w-auto

            lg:mt-0
          "
        >
          <LiquidSubmitButton
            state={
              submitState ===
              "submitting"
                ? "loading"
                : submitState ===
                      "completing" ||
                    submitState ===
                      "success"
                  ? "complete"
                  : "idle"
            }
          />
        </div>
      </motion.form>
    </>
  );
}