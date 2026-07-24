import { AlertCircle, Inbox, LoaderCircle } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";

type StatusStateProps = {
  state: "loading" | "empty" | "error";
  title: string;
  description: string;
  action?: { label: string; href: string };
};

export function StatusState({
  state,
  title,
  description,
  action,
}: StatusStateProps) {
  const Icon =
    state === "loading" ? LoaderCircle : state === "empty" ? Inbox : AlertCircle;

  return (
    <Card className="mx-auto max-w-xl py-12 text-center" role={state === "error" ? "alert" : "status"}>
      <Icon
        aria-hidden="true"
        className={`mx-auto size-8 text-accent ${state === "loading" ? "animate-spin" : ""}`}
      />
      <h1 className="mt-5 text-2xl">{title}</h1>
      <p className="mt-3 text-muted">{description}</p>
      {action ? (
        <Button href={action.href} variant="secondary" className="mt-6">
          {action.label}
        </Button>
      ) : null}
    </Card>
  );
}
