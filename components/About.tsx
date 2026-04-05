import { landing } from "@/content/landing";
import ScrollReveal from "@/components/ScrollReveal";

export default function About() {
  const { about } = landing;

  return (
    <section id="about" className="scroll-mt-20 py-24 px-4 bg-surface-base">
      <div className="max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl text-text-primary mb-8">
            {about.title}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          {about.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-lg text-text-secondary leading-relaxed mb-6 last:mb-0"
            >
              {paragraph}
            </p>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
