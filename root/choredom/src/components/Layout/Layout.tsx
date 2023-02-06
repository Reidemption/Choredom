import React, { ReactNode } from "react";
import Navbar from "../Navbar/Navbar";

interface LayoutProps {
  children?: ReactNode;
  // any props that come into the component
}

const Layout: React.FC = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
