import './styles/globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';

import { cn } from '@/shared/lib/utils';
import { Toaster } from '@/shared/shadcn-ui/ui/toaster';

import { ThemeProvider } from './providers/theme-provider';
import { ModalProvider } from './providers/modal-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Companion',
  description: 'Here you can talk to AI companions and create own custom companions by specific request.',
};

export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            'bg-secondary',
            inter.className,
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            <Toaster />
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
