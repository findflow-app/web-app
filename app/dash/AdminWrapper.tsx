"use client";

import { AppShell, Box, Burger, Group } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import React, { FC } from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import AdminNavbar from "./AdminNavbar";

interface AdminWrapperProps {
  children: React.ReactNode;
}

const AdminWrapper: FC<AdminWrapperProps> = ({ children }) => {
  const [opened, { toggle }] = useDisclosure();
  const hideHeader = useMediaQuery("(min-width: 768px)");

  return (
    <AppShell
      header={{
        height: { base: 60, md: 70, lg: 80 },
        collapsed: hideHeader,
      }}
      navbar={{
        width: { base: 200, md: 300 },
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

          <Box sx={{ flexGrow: 1 }}>asdasdasd</Box>

          <ThemeSwitcher />
        </Group>
      </AppShell.Header>
      <AdminNavbar />
      <AppShell.Main sx={{ display: "flex", flexDirection: "column" }}>{children}</AppShell.Main>
    </AppShell>
  );
};

export default AdminWrapper;
