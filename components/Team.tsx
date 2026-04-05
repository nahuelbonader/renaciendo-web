import { landing } from "@/content/landing";
import ScrollReveal from "@/components/ScrollReveal";

export default function Team() {
  const { team } = landing;

  return (
    <section id="team" className="scroll-mt-20 py-24 px-4 bg-brand-tertiary/10">
      <div className="max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl text-text-primary mb-8">
            {team.title}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          {team.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-lg text-text-secondary leading-relaxed mb-6"
            >
              {paragraph}
            </p>
          ))}
          <p className="text-lg text-text-secondary leading-relaxed">
            {team.authorIntro}{" "}
            <span className="text-brand-primary font-bold">
              {team.authorHighlight}
            </span>
            , {team.authorDescription}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
