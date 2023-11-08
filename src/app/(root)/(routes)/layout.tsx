import { FC, ReactNode } from 'react';

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <div className="bg-red-500">
      {children}
    </div>
  );
};

export default RootLayout;
