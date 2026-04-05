import { landing } from "@/content/landing";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { Card } from "@/components/ui";

const accentStyles = [
  "bg-brand-secondary/20 border-brand-secondary/40 hover:shadow-brand-secondary/30",
  "bg-brand-primary/20 border-brand-primary/40 hover:shadow-brand-primary/30",
  "bg-brand-tertiary/20 border-brand-tertiary/40 hover:shadow-brand-tertiary/30",
];

export default function Products() {
  const { products } = landing;

  return (
    <section id="products" className="scroll-mt-20 py-24 px-4 bg-surface-soft">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl text-text-primary text-center mb-4">
            {products.title}
          </h2>
          <p className="text-center text-text-secondary mb-16 text-lg">
            {products.subtitle}
          </p>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-8">
          {products.items.map((product, index) => (
            <ScrollReveal key={product.title} delay={index * 0.15} className="h-full">
              <Card
                variant="accent"
                size="auto"
                hoverable
                className={`h-full ${accentStyles[index % accentStyles.length]}`}
              >
                <div className="text-5xl mb-6">{product.icon}</div>
                <h3 className="text-xl text-text-primary mb-4">
                  {product.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {product.description}
                </p>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
