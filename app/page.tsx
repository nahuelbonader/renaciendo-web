import Hero from "@/components/Hero";
import About from "@/components/About";
import Products from "@/components/Products";
import Team from "@/components/Team";
import Subscribe from "@/components/Subscribe";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Products />
      <Team />
      <Subscribe />
      <Footer />
    </main>
  );
}
