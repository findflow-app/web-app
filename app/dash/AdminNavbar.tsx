"use client";

import { ActionIcon, AppShell, Box, Group, Text, useMantineColorScheme } from "@mantine/core";
import { useColorScheme, useMediaQuery } from "@mantine/hooks";
import { ExternalLink, LayoutDashboard } from "lucide-react";
import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import { useRouter } from "next/navigation";
import AdminImage from "./AdminImage";
import AdminNavbarLink from "./NavLink";

const AdminNavbar = () => {
  const showLogo = useMediaQuery("(min-width: 768px)");
  const router = useRouter();
  const { colorScheme } = useMantineColorScheme();

  return (
    <AppShell.Navbar
      p="md"
      sx={(theme, u) => ({
        [u.dark]: {
          backgroundColor: "var(--mantine-color-dark-8)",
        },
        [u.light]: {
          backgroundColor: "var(--mantine-color-gray-1)",
        },
      })}
    >
      <AppShell.Section hidden={!showLogo} pb="md" mb={8}>
        <Group>
          <Box style={{ flexGrow: 1 }}>
            <AdminImage />
          </Box>
          <ThemeSwitcher />
        </Group>
      </AppShell.Section>

      <AppShell.Section grow>
        <AdminNavbarLink text="Dashboard" icon={<LayoutDashboard />} to="/dash" />
        <AdminNavbarLink text="Dalsi" icon={<LayoutDashboard />} to="/admin" />
        <AdminNavbarLink text="idk" icon={<LayoutDashboard />} to="/admin" />
      </AppShell.Section>

      <AppShell.Section>
        <Group>
          <Text sx={{ flexGrow: 1 }}>username</Text>
          <ActionIcon color="gray" variant="light" onClick={() => router.push("/profile")} p={4}>
            <ExternalLink />
          </ActionIcon>
        </Group>
      </AppShell.Section>
    </AppShell.Navbar>
  );
};

export default AdminNavbar;
