"use client";

import { ActionIcon, AppShell, Box, Group, Text, useMantineColorScheme } from "@mantine/core";
import { useColorScheme, useMediaQuery } from "@mantine/hooks";
import { ExternalLink, LayoutDashboard, Search } from "lucide-react";
import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import { useRouter } from "next/navigation";
import AdminImage from "./AdminImage";
import AdminNavbarLink from "./NavLink";
import { useUser } from "../UserProvider";
import { useQueryClient } from "@tanstack/react-query";
import { logout } from "../api/auth";
import { notifications } from "@mantine/notifications";

const AdminNavbar = () => {
  const showLogo = useMediaQuery("(min-width: 768px)");
  const router = useRouter();
  const { colorScheme } = useMantineColorScheme();
  const { user, setUser } = useUser();
  const queryClient = useQueryClient();

  if (!user) {
    return null;
  }

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
        <AdminNavbarLink text="Search" icon={<Search />} to="/dash/search" />
        <AdminNavbarLink text="idk" icon={<LayoutDashboard />} to="/admin" />
      </AppShell.Section>

      <AppShell.Section>
        <Group>
          <Text sx={{ flexGrow: 1 }}>{user?.name}</Text>
          <ActionIcon
            color="gray"
            variant="light"
            onClick={() => {
              logout(queryClient);
              setUser(null);

              notifications.show({
                title: "Logged out",
                message: "You have been logged out",
              });

              router.push("/login");
            }}
            p={4}
          >
            <ExternalLink />
          </ActionIcon>
        </Group>
      </AppShell.Section>
    </AppShell.Navbar>
  );
};

export default AdminNavbar;
