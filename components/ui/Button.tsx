import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        primary: "bg-surface-base text-text-primary hover:bg-surface-base/90",
        secondary:
          "bg-brand-primary text-text-inverse hover:bg-brand-primary/80",
        ghost: "bg-transparent text-text-secondary hover:text-text-primary",
        outline:
          "bg-transparent border border-border-default text-text-primary hover:bg-surface-soft",
        success:
          "bg-feedback-success text-text-inverse hover:bg-feedback-success/80",
        danger:
          "bg-feedback-error text-text-inverse hover:bg-feedback-error/80",
        warning:
          "bg-feedback-warning text-text-inverse hover:bg-feedback-warning/80",
        info: "bg-feedback-info text-text-inverse hover:bg-feedback-info/80",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    className?: string;
  };

export default function Button({
  variant,
  size,
  asChild = false,
  className,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
