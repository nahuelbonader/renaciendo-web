"use client";

import { useState, FormEvent } from "react";
import { landing } from "@/content/landing";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function Subscribe() {
  const { subscribe: content } = landing;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(content.success);
        setName("");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || content.genericError);
      }
    } catch {
      setStatus("error");
      setMessage(content.connectionError);
    }
  }

  return (
    <section
      id="subscribe"
      className="scroll-mt-20 py-24 px-4 bg-brand-primary/10"
    >
      <ScrollReveal>
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl text-text-primary mb-4">
          {content.title}
        </h2>
        <p className="text-lg text-text-secondary mb-10">{content.subtitle}</p>

        {status === "success" ? (
          <p className="text-lg text-feedback-success bg-feedback-success/10 rounded-2xl py-6 px-4">
            {message}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label htmlFor="subscribe-name" className="sr-only">
              {content.namePlaceholder}
            </label>
            <Input
              id="subscribe-name"
              type="text"
              placeholder={content.namePlaceholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="text-center"
            />
            <label htmlFor="subscribe-email" className="sr-only">
              {content.emailPlaceholder}
            </label>
            <Input
              id="subscribe-email"
              type="email"
              placeholder={content.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-center"
            />
            <Button
              type="submit"
              variant="secondary"
              size="lg"
              disabled={status === "loading"}
              className="disabled:opacity-50"
            >
              {status === "loading" ? content.loading : content.cta}
            </Button>
            {status === "error" && (
              <p className="text-feedback-error text-sm">{message}</p>
            )}
          </form>
        )}
      </div>
      </ScrollReveal>
    </section>
  );
}
