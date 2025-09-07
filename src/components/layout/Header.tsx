
'use client';

import Link from 'next/link';
import { Menu, PlaneTakeoff, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Container from '../ui/Container';
import { usePathname } from 'next/navigation';

const navigationLinks = [
  { href: '/', label: 'Home' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/40" : "bg-transparent"
    )}>
      <Container>
        <div className="relative flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <PlaneTakeoff className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold tracking-tight text-foreground">WorldTrips</span>
          </Link>
          <div className="hidden items-center space-x-4 lg:flex">
            <nav className="flex items-center space-x-6 text-sm font-medium">
              {navigationLinks.map((link) => (
                <Link key={`${link.href}-${link.label}`} href={link.href} className="text-foreground/80 transition-colors hover:text-primary">
                  {link.label}
                </Link>
              ))}
            </nav>
            <Link href="/destinations">
              <Button>Book a Trip</Button>
            </Link>
          </div>
          <div className="lg:hidden">
            <Button onClick={toggleNavbar} variant="ghost" size="icon">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        {isOpen && (
          <div
            className={cn(
              'absolute left-0 top-16 w-full animate-in fade-in-20 slide-in-from-top-4 lg:hidden',
              'bg-background border-b border-border/40'
            )}
          >
            <nav className="grid gap-4 p-4">
              {navigationLinks.map((link) => (
                <Link key={`${link.href}-${link.label}-mobile`} href={link.href} className="text-lg font-medium text-foreground/80 transition-colors hover:text-primary" onClick={toggleNavbar}>
                  {link.label}
                </Link>
              ))}
              <Link href="/destinations">
                <Button className="w-full">Book a Trip</Button>
              </Link>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;
