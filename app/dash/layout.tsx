"use client";

import React, { FC } from "react";
import AdminWrapper from "./AdminWrapper";
import { useUser } from "../UserProvider";
import { Button, Center, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";

interface DashLayoutProps {
  children: React.ReactNode;
}

const DashLayout: FC<DashLayoutProps> = ({ children }) => {
  const { user } = useUser();
  if (!user) {
    // not logged in
    return (
      <Stack align="center" mt={64}>
        <Title order={1}>Unauthorized</Title>
        <Text>Please log in to access this page</Text>

        <Button component={Link} href="/login" color="blue">
          Log in
        </Button>
      </Stack>
    );
  }

  return <AdminWrapper>{children}</AdminWrapper>;
};

export default DashLayout;
