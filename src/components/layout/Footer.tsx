
import Link from 'next/link';
import { PlaneTakeoff, Facebook, X, Instagram } from 'lucide-react';
import Container from '../ui/Container';

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-background/95">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col gap-4 md:col-span-1 lg:col-span-1">
              <Link href="/" className="flex items-center gap-2">
                <PlaneTakeoff className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold tracking-tight text-foreground">Explorly</span>
              </Link>
              <p className="text-sm text-foreground/60">Your adventure starts here. Discover and book unique travel experiences worldwide.</p>
              <div className="flex gap-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook className="h-5 w-5 text-foreground/60 hover:text-primary transition-colors" /></a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X"><X className="h-5 w-5 text-foreground/60 hover:text-primary transition-colors" /></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram className="h-5 w-5 text-foreground/60 hover:text-primary transition-colors" /></a>
              </div>
            </div>
            <div className="md:col-span-1 lg:col-span-1">
              <h3 className="font-semibold mb-4">Explore</h3>
              <ul className="space-y-2">
                <li><Link href="/destinations" className="text-sm text-foreground/60 hover:text-primary transition-colors">Destinations</Link></li>
                <li><Link href="/gallery" className="text-sm text-foreground/60 hover:text-primary transition-colors">Gallery</Link></li>
                <li><Link href="/#continents" className="text-sm text-foreground/60 hover:text-primary transition-colors">Continents</Link></li>
              </ul>
            </div>
            <div className="md:col-span-1 lg:col-span-1">
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-sm text-foreground/60 hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="text-sm text-foreground/60 hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div className="md:col-span-1 lg:col-span-1">
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link href="/faq" className="text-sm text-foreground/60 hover:text-primary transition-colors">FAQ</Link></li>
                <li><Link href="/help" className="text-sm text-foreground/60 hover:text-primary transition-colors">Help Center</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-border/40 py-6 text-center text-sm text-foreground/60">
          <p>&copy; {new Date().getFullYear()} Explorly. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
