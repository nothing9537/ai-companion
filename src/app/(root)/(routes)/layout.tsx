import { FC, ReactNode } from 'react';
import { Navbar } from '@/widgets/navbar';

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <div className="h-full">
      <Navbar />
      <main className="md:pl-20 pt-16 h-full">
        {children}
      </main>
    </div>
  );
};

export default RootLayout;
