import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "rounded-full border px-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 placeholder:text-text-secondary/60",
  {
    variants: {
      variant: {
        default: "border-border-default bg-surface-base text-text-primary",
        error: "border-feedback-error bg-surface-base text-text-primary",
      },
      size: {
        sm: "py-2 text-sm",
        md: "py-3 text-base",
        lg: "py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants> & {
    className?: string;
  };

export default function Input({
  variant,
  size,
  className,
  ...props
}: InputProps) {
  return (
    <input
      className={cn(inputVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { inputVariants };
