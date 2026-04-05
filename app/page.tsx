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
        backgroundImage="https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1920&q=80"
      />
      <Products />
      <Team />
      <Quote
        text={landing.quotes[1]}
        backgroundImage="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80"
      />
      <Subscribe />
      <Footer />
    </main>
  );
}
