import { FC, ReactNode } from 'react';
import { Metadata } from 'next';

import { Navbar } from '@/widgets/navbar';
import { Sidebar } from '@/widgets/sidebar';
import { checkSubscription } from '@/shared/lib/subscription';

export const metadata: Metadata = {
  title: 'AI Companion / Home',
  description: 'Select and talk to AI companions',
};

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = async ({ children }) => {
  const isPro = await checkSubscription();

  return (
    <div className="h-full">
      <Navbar isPro={isPro} sheetContent={<Sidebar isPro={isPro} />} />
      <section className="hidden md:flex mt-16 w-20 flex-col fixed inset-y-0">
        <Sidebar isPro={isPro} />
      </section>
      <main className="md:pl-20 pt-16 h-full">
        {children}
      </main>
    </div>
  );
};

export default Layout;
