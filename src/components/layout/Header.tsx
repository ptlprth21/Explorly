
'use client';

import Link from 'next/link';
import { Menu, Compass, X, User, Bell } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Container from '../ui/Container';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from "@/components/ThemeToggle";
import { getUserNotifications } from '@/actions/notifications';

const navigationLinks = [
  { href: '/', label: 'Home' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const isHomePage = pathname === '/';
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Object>();

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
    if (!user) return;
    const fetchNotifications = async () => {
      const data = await getUserNotifications(user.id);
      setNotifications(data);
    };
    fetchNotifications();
  }, [user]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.notification-menu')) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  const showFullHeader = true;

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300 overflow-visible",
      isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/40" : "bg-transparent"
    )}>
      <Container>
        <div className="relative flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="https://0ec90b57d6e95fcbda19832f.supabase.co/storage/v1/object/public/media/images/logo.png" className="h-12 w-12"/>
            <span className="text-xl font-bold tracking-tight text-foreground">Explorly</span>
          </Link>
          <div className="hidden items-center space-x-4 lg:flex">
             {showFullHeader && (
              <>

                <nav className="flex items-center space-x-6 text-sm font-medium">
                  {navigationLinks.map((link) => (
                    <Link key={`${link.href}-${link.label}`} href={link.href} className={cn("transition-colors hover:text-primary", pathname === link.href ? "text-primary" : "text-foreground/80")}>
                      {link.label}
                    </Link>
                  ))}
                   {/* {user && (
                    <Link href="/account" className={cn("transition-colors hover:text-primary", pathname === '/account' ? "text-primary" : "text-foreground/80")}>
                      My Account
                    </Link>
                  )} */}
                  {user && (
                    <div className="flex items-center space-x-2">
                      <div className="relative notification-menu">
                        <button
                          onClick={() => setShowNotifications(!showNotifications)}
                          className={cn(
                            "transition-colors hover:text-primary p-2 rounded-full",
                            showNotifications ? "text-primary" : "text-foreground/80"
                          )}
                        >
                          <Bell className="h-6 w-6" />
                        </button>

                        {showNotifications && (
                          <div className="absolute right-0 mt-2 notification-menu w-72 bg-background/80 text-gray-300 shadow-xl rounded-xl border border-gray-200 z-50 ">
                            <div className="p-3 font-semibold border-b text-foreground">Notifications</div>

                            <div className="max-h-64 overflow-y-auto">
                              {notifications.length > 0 ? (
                                notifications.map((n) => (
                                  <div key={n.id} className="px-4 py-3 hover:bg-accent cursor-pointer text-sm border-b last:border-none">
                                    {n.message}
                                  </div>
                                ))
                              ) : (
                                <div className="p-4 text-sm text-gray-600">No notifications</div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>


                      <Link href="/account" className={cn(
                          "transition-colors hover:text-primary p-2 rounded-full",
                          pathname === '/account' ? "text-primary" : "text-foreground/80"
                        )}
                        aria-label="My Account"
                      >
                        <User className="h-6 w-6" />
                      </Link>
                    </div>
                  )}
                </nav>
                {!user && (
                  <div className='flex items-center space-x-2'>
                    <Button asChild variant="ghost"><Link href="/login">Log In</Link></Button>
                    {/* <Button asChild><Link href="/signup">Sign Up</Link></Button> */}
                  </div>
                )}

                <ThemeToggle />
              </>
            )}
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

              <ThemeToggle />

              {navigationLinks.map((link) => (
                <Link key={`${link.href}-${link.label}-mobile`} href={link.href} className={cn("text-lg font-medium transition-colors hover:text-primary", pathname === link.href ? "text-primary" : "text-foreground/80")} onClick={toggleNavbar}>
                  {link.label}
                </Link>
              ))}
               {user && (
                <Link href="/account" className={cn("text-lg font-medium transition-colors hover:text-primary", pathname === '/account' ? "text-primary" : "text-foreground/80")} onClick={toggleNavbar}>
                  My Account
                </Link>
              )}

              {user ? (
                <Button onClick={signOut} variant="outline">Sign Out</Button>
              ) : (
                <div className='grid grid-cols-2 gap-2'>
                  <Button asChild variant="ghost"><Link href="/login">Log In</Link></Button>
                  {/* <Button asChild><Link href="/signup">Sign Up</Link></Button> */}
                </div>
              )}
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;
