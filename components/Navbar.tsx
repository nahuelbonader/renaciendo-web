import Image from "next/image";
import Link from "next/link";
import { landing } from "@/content/landing";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-primary/90 backdrop-blur-sm border-b border-brand-primary">
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/">
          <Image
            src="/images/logo-sun.png"
            alt={landing.nav.logoAlt}
            width={80}
            height={80}
            style={{ width: "auto", height: "auto" }}
          />
        </Link>
        <ul className="hidden md:flex gap-8 text-sm text-text-inverse/80">
          {landing.nav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="hover:text-text-inverse transition-colors"
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
