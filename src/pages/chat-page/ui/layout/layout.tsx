import { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="mx-auto max-w-4xl h-full w-full">
      {children}
    </div>
  );
};

export default Layout;
