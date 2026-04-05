import Image from "next/image";
import { landing } from "@/content/landing";

export default function Hero() {
  const { hero } = landing;

  return (
    <section className="min-h-screen pt-20 flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-brand-secondary via-brand-primary to-brand-tertiary">
      <Image
        src="/images/logo-text.png"
        alt={hero.logoAlt}
        width={200}
        height={200}
        priority
        style={{ width: "auto", height: "auto" }}
      />
      <h1 className="mt-8 text-4xl md:text-6xl text-text-inverse max-w-2xl leading-tight">
        {hero.tagline}
      </h1>
      <p className="mt-6 text-lg md:text-xl text-text-inverse/80 max-w-xl">
        {hero.subtitle}
      </p>
      <a
        href="#subscribe"
        className="mt-10 px-8 py-3 bg-surface-base text-text-primary rounded-full hover:bg-surface-base/90 transition-colors text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-base focus-visible:ring-offset-2"
      >
        {hero.cta}
      </a>
    </section>
  );
}
