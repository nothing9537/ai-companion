import { FC, ReactNode } from 'react';
import { Navbar } from '@/widgets/navbar';
import { Sidebar } from '@/widgets/sidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-full">
      <Navbar sheetContent={<Sidebar />} />
      <section className="hidden md:flex mt-16 w-20 flex-col fixed inset-y-0">
        <Sidebar />
      </section>
      <main className="md:pl-20 pt-16 h-full">
        {children}
      </main>
    </div>
  );
};

export default Layout;
