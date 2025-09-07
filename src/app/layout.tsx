
'use client'

import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/theme-provider';
import ErrorBoundary from '@/components/layout/ErrorBoundary';
import { BookingWizardProvider, useBookingWizard } from '@/context/BookingWizardContext';
import BookingWizard from '@/components/booking/BookingWizard';
import FloatingBookingPanel from '@/components/layout/FloatingBookingPanel';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// export const metadata: Metadata = {
//   title: 'RoamReady - Your Adventure Awaits',
//   description: 'A modern travel booking platform for unforgettable journeys.',
//   icons: {
//     icon: '/favicon.ico',
//   },
// };

function AppLayout({ children }: { children: React.ReactNode }) {
  const { isWizardOpen, closeWizard, selectedPackage, openWizard } = useBookingWizard();
  
  return (
    <div className="relative flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
      <FloatingBookingPanel onOpenWizard={() => openWizard(null)} />
      {isWizardOpen && (
        <BookingWizard
          selectedPackage={selectedPackage}
          onClose={closeWizard}
        />
      )}
    </div>
  );
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
       <head>
        <title>RoamReady - Your Adventure Awaits</title>
        <meta name="description" content="A modern travel booking platform for unforgettable journeys." />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={cn('min-h-screen font-body antialiased flex flex-col', inter.variable)} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <ErrorBoundary>
              <BookingWizardProvider>
                <AppLayout>{children}</AppLayout>
              </BookingWizardProvider>
              <Toaster />
            </ErrorBoundary>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
