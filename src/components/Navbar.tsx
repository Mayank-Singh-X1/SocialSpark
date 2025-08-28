import Link from 'next/link';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu, Sparkles } from 'lucide-react';

const navLinks = [
  { href: '/generator', label: 'Generator' },
  { href: '/templates', label: 'Templates' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/calendar', label: 'Calendar' },
];

export default function Navbar() {
  return (
    <header className="bg-card/80 backdrop-blur-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="font-headline">SocialSpark</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hidden md:inline-flex">
            Log in
          </Button>
          <Button className="hidden md:inline-flex bg-accent hover:bg-accent/90">
            Sign Up
          </Button>
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col gap-6 pt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t pt-6 flex flex-col gap-4">
                   <Button variant="ghost">Log in</Button>
                   <Button className="bg-accent hover:bg-accent/90">Sign Up</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
