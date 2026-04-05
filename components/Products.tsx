import { landing } from "@/content/landing";

const accentStyles = [
  "bg-brand-secondary/20 border-brand-secondary/40",
  "bg-brand-primary/20 border-brand-primary/40",
  "bg-brand-tertiary/20 border-brand-tertiary/40",
];

export default function Products() {
  const { products } = landing;

  return (
    <section id="products" className="scroll-mt-16 py-24 px-4 bg-surface-soft">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl text-text-primary text-center mb-4">
          {products.title}
        </h2>
        <p className="text-center text-text-secondary mb-16 text-lg">
          {products.subtitle}
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {products.items.map((product, index) => (
            <div
              key={product.title}
              className={`rounded-2xl border p-8 ${accentStyles[index % accentStyles.length]} transition-transform hover:scale-105`}
            >
              <h3 className="text-xl text-text-primary mb-4">
                {product.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {product.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
