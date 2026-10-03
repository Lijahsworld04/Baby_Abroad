import { Link } from "react-router-dom";
import { Mail, Phone, Music2, ExternalLink } from "lucide-react";

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "How It Works", href: "/howitworks" },
  { label: "Guides", href: "/guides" },
  { label: "FAQ", href: "/faq" },
  { label: "Sample Plan", href: "/sample-plan" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-primary/15 bg-transparent py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <Link to="/" className="flex items-center gap-2 font-semibold text-foreground">
              <img src="/mascot.png" alt="" width={40} height={40} className="size-10 object-contain" />
              <span className="font-script text-3xl leading-none font-normal">Baby Abroad</span>
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground">
              Supportive, practical guidance for your move abroad.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-foreground">Quick Links</h2>
            <ul className="flex flex-col gap-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in touch */}
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-foreground">Get in Touch</h2>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-primary" aria-hidden="true" />
                <a
                  href="mailto:contact@gobabyabroad.com"
                  className="transition-colors hover:text-primary"
                >
                  contact@gobabyabroad.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 text-primary" aria-hidden="true" />
                <a
                  href="https://wa.me/18156169684"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary"
                >
                  WhatsApp +1 815 616 9684
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-foreground">Follow</h2>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <ExternalLink className="size-4 text-primary" aria-hidden="true" />
                <a
                  href="https://instagram.com/babyabroadofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary"
                >
                  Instagram @babyabroadofficial
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Music2 className="size-4 text-primary" aria-hidden="true" />
                <a
                  href="https://tiktok.com/@babyabroadofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary"
                >
                  TikTok @babyabroadofficial
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-primary/15 pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Baby Abroad. All rights reserved.
          </p>
          <p className="mt-2 text-center text-sm">
            <Link to="/privacy" className="text-muted-foreground underline-offset-4 hover:text-primary hover:underline">
              Privacy Policy
            </Link>
            <span className="mx-2 text-muted-foreground" aria-hidden="true">·</span>
            <Link to="/terms" className="text-muted-foreground underline-offset-4 hover:text-primary hover:underline">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}