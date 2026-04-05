import { landing } from "@/content/landing";

export default function Footer() {
  const { footer } = landing;

  return (
    <footer className="py-12 px-4 bg-text-primary text-text-inverse/70 text-center">
      <p className="text-lg text-text-inverse/90 italic mb-6">
        &ldquo;{footer.quote}&rdquo;
      </p>
      <div className="mb-6">
        <a
          href={footer.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-brand-primary transition-colors"
        >
          {footer.instagramHandle}
        </a>
      </div>
      <p className="text-sm">
        &copy; {new Date().getFullYear()} {footer.copyright}
      </p>
    </footer>
  );
}
