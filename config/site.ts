export type ApprovalState = "approved" | "client-approval-required";

export type ContactItem = {
  label: string;
  value: string;
  href: `tel:${string}` | `mailto:${string}` | null;
  approval: ApprovalState;
};

export type SocialItem = {
  label: string;
  network: "linkedin" | "instagram" | "facebook";
  href: `https://${string}` | null;
  approval: ApprovalState;
};

export const siteConfig = {
  name: "InnovGen",
  legalName: "InnovGen IT Software Solutions",
  description:
    "Secure, scalable digital systems for ambitious organizations.",
} as const;

export const contactItems = [
  {
    label: "Phone",
    value: "Phone pending client approval",
    href: null,
    approval: "client-approval-required",
  },
  {
    label: "Email",
    value: "Email pending client approval",
    href: null,
    approval: "client-approval-required",
  },
  {
    label: "Office",
    value: "Office location pending client approval",
    href: null,
    approval: "client-approval-required",
  },
  {
    label: "Business hours",
    value: "Business hours pending client approval",
    href: null,
    approval: "client-approval-required",
  },
] as const satisfies readonly ContactItem[];

export const socialItems = [
  {
    label: "LinkedIn",
    network: "linkedin",
    href: null,
    approval: "client-approval-required",
  },
  {
    label: "Instagram",
    network: "instagram",
    href: null,
    approval: "client-approval-required",
  },
  {
    label: "Facebook",
    network: "facebook",
    href: null,
    approval: "client-approval-required",
  },
] as const satisfies readonly SocialItem[];

export const trustItems: readonly {
  label: string;
  type: "partner" | "certification" | "client";
  approval: "approved";
}[] = [];
