"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const fieldClass =
  "h-11 w-full rounded-xl border border-border bg-surface px-3.5 text-sm text-primary outline-none transition-colors duration-200 placeholder:text-tertiary focus:border-accent/60";

/**
 * Static contact form. There is no backend by design: on submit it validates,
 * then opens the visitor's mail client with the message prefilled. Nothing is
 * sent anywhere without the visitor seeing and sending it themselves.
 */
export function ContactForm() {
  const [values, setValues] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = React.useState<Errors>({});
  const [handedOff, setHandedOff] = React.useState(false);

  const set = (key: keyof typeof values) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Please add your name.";
    if (!values.email.trim()) next.email = "Please add an email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
      next.email = "That doesn't look like a valid email address.";
    if (values.message.trim().length < 20)
      next.message = "A sentence or two more, so I can reply usefully.";
    return next;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const subject = values.subject.trim() || `Portfolio enquiry from ${values.name}`;
    const body = `${values.message}\n\n—\n${values.name}\n${values.email}`;

    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setHandedOff(true);
  };

  if (handedOff) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-[var(--radius-card)] border border-emerald-400/35 bg-emerald-400/[0.06] p-7 text-center"
      >
        <CheckCircle2 className="mx-auto size-8 text-positive" />
        <p className="mt-4 text-lg font-semibold">Your mail client should be open.</p>
        <p className="mt-2 text-sm leading-relaxed text-secondary">
          The message is drafted and ready — press send there and it reaches me.
          If nothing opened, email {profile.email} directly.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setHandedOff(false)}
        >
          Edit the message
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" error={errors.name} htmlFor="name">
          <input
            id="name"
            name="name"
            value={values.name}
            onChange={set("name")}
            placeholder="Your name"
            autoComplete="name"
            className={cn(fieldClass, errors.name && "border-rose-400/70")}
          />
        </Field>

        <Field label="Email" error={errors.email} htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={set("email")}
            placeholder="you@company.com"
            autoComplete="email"
            className={cn(fieldClass, errors.email && "border-rose-400/70")}
          />
        </Field>
      </div>

      <Field label="Subject" htmlFor="subject" optional>
        <input
          id="subject"
          name="subject"
          value={values.subject}
          onChange={set("subject")}
          placeholder="Role, project or question"
          className={fieldClass}
        />
      </Field>

      <Field label="Message" error={errors.message} htmlFor="message">
        <textarea
          id="message"
          name="message"
          value={values.message}
          onChange={set("message")}
          rows={6}
          placeholder="What's the problem you're trying to solve?"
          className={cn(
            fieldClass,
            "h-auto resize-y py-3 leading-relaxed",
            errors.message && "border-rose-400/70"
          )}
        />
      </Field>

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <Button type="submit" size="lg">
          <Send />
          Send message
        </Button>
        <p className="text-xs leading-relaxed text-tertiary">
          Opens your mail client with the message drafted — nothing is sent until
          you send it.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  htmlFor,
  optional,
  children,
}: {
  label: string;
  error?: string;
  htmlFor: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 flex items-baseline gap-2 text-sm font-medium"
      >
        {label}
        {optional ? (
          <span className="text-[0.7rem] font-normal text-tertiary">optional</span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p role="alert" className="mt-1.5 text-xs text-critical">
          {error}
        </p>
      ) : null}
    </div>
  );
}
