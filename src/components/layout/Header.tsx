
'use client';

import Link from 'next/link';
import { Menu, PlaneTakeoff, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Container from '../ui/Container';

const navigationLinks = [
  { href: '/', label: 'Home' },
  { href: '/destinations', label: 'Destinations' },
  { href: '#', label: 'About Us' },
  { href: '#', label: 'Contact' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="relative flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <PlaneTakeoff className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold tracking-tight text-foreground">RoamReady</span>
          </Link>
          <div className="hidden items-center space-x-4 md:flex">
            <nav className="flex items-center space-x-6 text-sm font-medium">
              {navigationLinks.map((link) => (
                <Link key={`${link.href}-${link.label}`} href={link.href} className="text-foreground/80 transition-colors hover:text-primary">
                  {link.label}
                </Link>
              ))}
            </nav>
            <Button>Book a Trip</Button>
          </div>
          <div className="md:hidden">
            <Button onClick={toggleNavbar} variant="ghost" size="icon">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        {isOpen && (
          <div
            className={cn(
              'absolute left-0 top-16 w-full animate-in fade-in-20 slide-in-from-top-4 md:hidden',
              'bg-background border-b border-border/40'
            )}
          >
            <nav className="grid gap-4 p-4">
              {navigationLinks.map((link) => (
                <Link key={`${link.href}-${link.label}-mobile`} href={link.href} className="text-lg font-medium text-foreground/80 transition-colors hover:text-primary" onClick={toggleNavbar}>
                  {link.label}
                </Link>
              ))}
              <Button className="w-full">Book a Trip</Button>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;
