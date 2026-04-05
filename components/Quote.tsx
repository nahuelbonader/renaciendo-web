import ScrollReveal from "@/components/animations/ScrollReveal";

interface QuoteProps {
  text: string;
  backgroundImage?: string;
  className?: string;
}

export default function Quote({ text, backgroundImage, className = "" }: QuoteProps) {
  return (
    <div
      className={`relative py-20 md:py-32 px-4 overflow-hidden ${className}`}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      {backgroundImage && (
        <div className="absolute inset-0 bg-text-primary/65" aria-hidden="true" />
      )}
      <ScrollReveal>
        <blockquote className="relative max-w-3xl mx-auto text-center">
          <p className="text-2xl md:text-4xl italic text-text-inverse leading-relaxed">
            &ldquo;{text}&rdquo;
          </p>
          <footer className="mt-6 text-text-inverse/70 text-sm tracking-widest uppercase">
            — Renaciendo en Sol Mayor
          </footer>
        </blockquote>
      </ScrollReveal>
    </div>
  );
}
