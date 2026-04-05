import ScrollReveal from "@/components/ScrollReveal";

interface QuoteProps {
  text: string;
  className?: string;
}

export default function Quote({ text, className = "" }: QuoteProps) {
  return (
    <div className={`py-16 md:py-24 px-4 ${className}`}>
      <ScrollReveal>
        <blockquote className="max-w-3xl mx-auto text-center">
          <p className="text-2xl md:text-4xl italic text-text-inverse/90 leading-relaxed">
            &ldquo;{text}&rdquo;
          </p>
          <footer className="mt-6 text-text-inverse/60 text-sm tracking-widest uppercase">
            — Renaciendo en Sol Mayor
          </footer>
        </blockquote>
      </ScrollReveal>
    </div>
  );
}
