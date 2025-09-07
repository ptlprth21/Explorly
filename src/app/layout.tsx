
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

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// export const metadata: Metadata = {
//   title: 'WorldTrips - Your Adventure Awaits',
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
      <body className={cn('min-h-screen font-body antialiased flex flex-col', inter.variable)} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ErrorBoundary>
            <BookingWizardProvider>
              <AppLayout>{children}</AppLayout>
            </BookingWizardProvider>
            <Toaster />
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
