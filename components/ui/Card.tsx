import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva("rounded-3xl border p-10", {
  variants: {
    variant: {
      default: "bg-surface-base border-border-default",
      accent: "",
      outline: "bg-transparent border-border-default",
    },
    size: {
      sm: "min-h-48",
      md: "min-h-64",
      lg: "min-h-80",
      auto: "",
    },
    hoverable: {
      true: "transition-all duration-300 hover:scale-105 hover:shadow-lg",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    hoverable: false,
  },
});

type CardProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants> & {
    className?: string;
  };

export default function Card({
  variant,
  size,
  hoverable,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(cardVariants({ variant, size, hoverable }), className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { cardVariants };
