
import Link from 'next/link';
import { Compass, Facebook, X, Instagram } from 'lucide-react';
import { Icon } from '@iconify/react';  
import Container from '../ui/Container';

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-background/95">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="flex flex-col gap-4 md:col-span-1 lg:col-span-1">
              <Link href="/" className="flex items-center gap-2">
                <img src="https://stlkmeffboaouzmdgiia.supabase.co/storage/v1/object/public/media/images/logo.png" alt="logo" width="40" height="40"/>
                <span className="text-xl font-bold tracking-tight text-foreground">Explorly</span>
              </Link>
              <p className="text-sm text-foreground/60">A curated collection of the world's best trips, vetted by experts. No clutter, just the best experiences.</p>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/profile.php?id=61584087081987" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook className="h-5 w-5 text-foreground/60 hover:text-primary transition-colors" /></a>
                <a href="https://x.com/explorly___" target="_blank" rel="noopener noreferrer" aria-label="X"><X className="h-5 w-5 text-foreground/60 hover:text-primary transition-colors" /></a>
                <a href="https://www.instagram.com/explorly___/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram className="h-5 w-5 text-foreground/60 hover:text-primary transition-colors" /></a>
                <a href="https://www.tiktok.com/@explorly" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><Icon icon="simple-icons:tiktok" className="h-5 w-5 text-foreground/60 hover:text-primary transition-colors" /></a>
              </div>
            </div>
            <div className="md:col-span-1 lg:col-span-1">
              <h3 className="font-semibold mb-4">Explore</h3>
              <ul className="space-y-2">
                <li><Link href="/destinations" className="text-sm text-foreground/60 hover:text-primary transition-colors">Destinations</Link></li>
                {/* <li><Link href="/gallery" className="text-sm text-foreground/60 hover:text-primary transition-colors">Gallery</Link></li> */}
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
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/conditions" className="text-sm text-foreground/60 hover:text-primary transition-colors">Terms & Conditions</Link></li>
                <li><Link href="/privacy" className="text-sm text-foreground/60 hover:text-primary transition-colors">Privacy Policy</Link></li>
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
          <p className="mb-2">Explorly is a brand of TheVIPGroup Sp. z o.o. 📍 Ul. Solipska 3/5, Warsaw, Poland 🏢 KRS: 0001184948 | NIP (VAT):5223341887 📞 +48 729 449 766 | ✉️ support@explorly.eu
          </p>
          <p>&copy; {new Date().getFullYear()} Explorly. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
