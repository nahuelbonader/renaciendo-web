import Image from "next/image";
import Link from "next/link";
import { landing } from "@/content/landing";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface-base/80 backdrop-blur-sm border-b border-border-subtle">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt={landing.nav.logoAlt}
            width={48}
            height={48}
            style={{ width: "auto", height: "auto" }}
          />
        </Link>
        <ul className="hidden md:flex gap-8 text-sm text-text-secondary">
          {landing.nav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="hover:text-brand-primary transition-colors"
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
