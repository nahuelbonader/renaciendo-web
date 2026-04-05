import Hero from "@/components/Hero";
import WaveDivider from "@/components/WaveDivider";
import About from "@/components/About";
import Quote from "@/components/Quote";
import Products from "@/components/Products";
import Team from "@/components/Team";
import Subscribe from "@/components/Subscribe";
import Footer from "@/components/Footer";
import { landing } from "@/content/landing";

export default function Home() {
  return (
    <main>
      <Hero />
      <WaveDivider colorVar="--color-surface-base" />
      <About />
      <Quote
        text={landing.quotes[0]}
        className="bg-gradient-to-r from-brand-primary to-brand-tertiary"
      />
      <Products />
      <Team />
      <Quote
        text={landing.quotes[1]}
        className="bg-gradient-to-r from-brand-secondary to-brand-primary"
      />
      <Subscribe />
      <Footer />
    </main>
  );
}
