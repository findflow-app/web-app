import React, { FC } from "react";
import AdminWrapper from "./AdminWrapper";

interface DashLayoutProps {
  children: React.ReactNode;
}

const DashLayout: FC<DashLayoutProps> = ({ children }) => {
  return <AdminWrapper>{children}</AdminWrapper>;
};

export default DashLayout;
