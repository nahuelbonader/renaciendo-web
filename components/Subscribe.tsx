"use client";

import { useState, FormEvent } from "react";
import { landing } from "@/content/landing";
import ScrollReveal from "@/components/ScrollReveal";

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
            <input
              id="subscribe-name"
              type="text"
              placeholder={content.namePlaceholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="px-6 py-3 rounded-full border border-border-default focus:outline-none focus:border-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary text-center"
            />
            <label htmlFor="subscribe-email" className="sr-only">
              {content.emailPlaceholder}
            </label>
            <input
              id="subscribe-email"
              type="email"
              placeholder={content.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-6 py-3 rounded-full border border-border-default focus:outline-none focus:border-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary text-center"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-8 py-3 bg-brand-primary text-text-inverse rounded-full hover:bg-brand-primary/80 transition-colors text-lg disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
            >
              {status === "loading" ? content.loading : content.cta}
            </button>
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
