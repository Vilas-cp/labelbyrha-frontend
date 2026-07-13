import Link from "next/link";
import { Container } from "@/components/common/container";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/constants/site";
import { NewsletterForm } from "./newsletter-form";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterLinkColumn {
  heading: string;
  links: readonly FooterLink[];
}

interface SocialLink {
  label: string;
  href: string;
}

interface FooterProps {
  linkColumns: readonly FooterLinkColumn[];
  socialLinks: readonly SocialLink[];
}

function Footer({ linkColumns, socialLinks }: FooterProps) {
  return (
    <footer className="border-t border-border bg-card">
      <Container className="flex flex-col gap-10 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4 lg:col-span-1">
            <Link href="/" className="font-heading text-xl text-foreground">
              {siteConfig.name}
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium tracking-[0.15em] text-foreground uppercase transition-colors hover:text-accent"
                >
                  {social.label}
                </Link>
              ))}
            </div>
          </div>

          {linkColumns.map((column) => (
            <div key={column.heading} className="flex flex-col gap-3">
              <p className="text-sm font-medium text-foreground">
                {column.heading}
              </p>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-foreground">
              Join our newsletter
            </p>
            <p className="text-sm text-muted-foreground">
              Sign up for early access to new arrivals and private sales.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <Separator />

        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
          reserved.
        </p>
      </Container>
    </footer>
  );
}

export { Footer };
