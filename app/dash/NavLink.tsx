"use client";

import { NavLink } from "@mantine/core";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { FC } from "react";

interface AdminNavbarLinkProps {
  text: string;
  icon: React.ReactNode;
  to: string;
  children?: React.ReactNode;
}

const AdminNavbarLink: FC<AdminNavbarLinkProps> = ({ text, icon, to, children }) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <NavLink
      component={Link}
      href={to}
      sx={{ borderRadius: ".2rem" }}
      leftSection={icon}
      label={text}
      active={to == "/admin" ? pathname == "/admin" : pathname.startsWith(to)}
    >
      {children}
    </NavLink>
  );
};

export default AdminNavbarLink;
