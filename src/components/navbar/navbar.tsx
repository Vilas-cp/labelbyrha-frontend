import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Container } from "@/components/common/container";
import { siteConfig } from "@/constants/site";

interface NavLink {
  label: string;
  href: string;
}

interface NavbarProps {
  links?: readonly NavLink[];
}

function Navbar({ links = [] }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <Container className="flex h-18 items-center justify-between gap-4">
        <div className="flex items-center gap-2 lg:hidden">
          <Sheet>
            <SheetTrigger
              render={<Button variant="ghost" size="icon" aria-label="Open menu" />}
            >
              <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <SheetHeader>
                <SheetTitle className="font-heading text-xl">
                  {siteConfig.name}
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="rounded-lg px-2 py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <Link
          href="/"
          className="font-heading text-xl tracking-wide text-foreground lg:flex-1"
        >
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-foreground transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-1">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            render={<Link href="/wishlist" aria-label="Wishlist" />}
          >
            <Heart />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            render={<Link href="/account" aria-label="Account" />}
          >
            <User />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            render={<Link href="/cart" aria-label="Cart" />}
          >
            <ShoppingBag />
          </Button>
        </div>
      </Container>
    </header>
  );
}

export { Navbar };
