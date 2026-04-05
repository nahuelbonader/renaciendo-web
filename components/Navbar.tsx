import Image from "next/image";
import { landing } from "@/content/landing";

export default function Navbar() {
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
      </div>
    </nav>
  );
}
