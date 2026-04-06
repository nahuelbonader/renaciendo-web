import { landing } from "@/content/landing";
import Button from "@/components/ui/Button";

export default function Footer() {
  const { footer } = landing;

  return (
    <footer className="py-12 px-4 bg-text-primary text-text-inverse/70 text-center">
      <p className="text-lg text-text-inverse/90 italic mb-6">
        &ldquo;{footer.quote}&rdquo;
      </p>
      <div className="mb-6">
        <Button variant="ghost" asChild className="text-text-inverse/70 hover:text-brand-primary">
          <a href={footer.instagramUrl} target="_blank" rel="noopener noreferrer">
            {footer.instagramHandle}
          </a>
        </Button>
      </div>
      <p className="text-sm">
        &copy; {footer.year} {footer.copyright}
      </p>
    </footer>
  );
}
