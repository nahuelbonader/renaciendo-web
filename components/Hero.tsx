import Image from "next/image";
import { landing } from "@/content/landing";

export default function Hero() {
  const { hero } = landing;

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-brand-secondary/30 via-brand-primary/20 to-brand-tertiary/30">
      <Image
        src="/images/logo.png"
        alt={hero.logoAlt}
        width={200}
        height={200}
        priority
      />
      <h1 className="mt-8 text-4xl md:text-6xl text-text-primary max-w-2xl leading-tight">
        {hero.tagline}
      </h1>
      <p className="mt-6 text-lg md:text-xl text-text-secondary max-w-xl">
        {hero.subtitle}
      </p>
      <a
        href="#subscribe"
        className="mt-10 px-8 py-3 bg-brand-primary text-text-inverse rounded-full hover:bg-brand-primary/80 transition-colors text-lg"
      >
        {hero.cta}
      </a>
    </section>
  );
}
