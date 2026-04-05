"use client";

import { useState } from "react";
import Image from "next/image";
import { landing } from "@/content/landing";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-primary backdrop-blur-sm">
      <div className="px-6 h-20 flex items-center justify-between">
        <a href="#">
          <Image
            src="/images/logo-sun.png"
            alt={landing.nav.logoAlt}
            width={80}
            height={80}
            style={{ width: "auto", height: "auto" }}
          />
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-10 text-base font-bold text-text-inverse">
          {landing.nav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="hover:text-text-inverse/60 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger button */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
        >
          <span
            className={`block h-0.5 w-full bg-text-inverse transition-all duration-300 ${
              isOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-full bg-text-inverse transition-all duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-full bg-text-inverse transition-all duration-300 ${
              isOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-brand-primary ${
          isOpen ? "max-h-64" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-6 py-6 text-base font-bold text-text-inverse">
          {landing.nav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="hover:text-text-inverse/60 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
