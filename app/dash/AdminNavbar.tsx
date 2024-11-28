"use client";

import { ActionIcon, AppShell, Group, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Box, ExternalLink } from "lucide-react";
import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import { useRouter } from "next/navigation";

const AdminNavbar = () => {
  const showLogo = useMediaQuery("(min-width: 768px)");
  const router = useRouter();

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
      <AppShell.Section hidden={!showLogo} pb="md">
        <Group>
          <Box style={{ flexGrow: 1 }}>{/* <AminNavbarImage /> */}</Box>
          <ThemeSwitcher />
        </Group>
      </AppShell.Section>

      <AppShell.Section grow>tady odkazy</AppShell.Section>

      <AppShell.Section>
        <Group>
          <Text sx={{ flexGrow: 1 }}>username</Text>
          <ActionIcon color="gray" variant="light" onClick={() => router.push("/profile")}>
            <ExternalLink />
          </ActionIcon>
        </Group>
      </AppShell.Section>
    </AppShell.Navbar>
  );
};

export default AdminNavbar;
