import { Button, Center, Fieldset, Flex, Paper, Stack, TextInput, Title } from "@mantine/core";
import Image from "next/image";
import React from "react";
import { useState } from "react";
import { PasswordInput, Progress, Text, Popover, Box, rem } from "@mantine/core";

const SignupPage = () => {
  return (
    <Stack mt={32} align="center">
      <Image src="/logo.svg" alt="Logo" width={300} height={100} />

      <Flex direction={"column"} w={500}>
        <Paper withBorder p={16} radius="lg">
          <Title mb={32} sx={{ textAlign: "center" }}>
            Sign up
          </Title>

          <Stack>
            <TextInput label="Email" withAsterisk placeholder="Your email" />
            <TextInput label="Username" withAsterisk placeholder="Your username" />
            <PasswordInput
              label="Password"
              withAsterisk
              description="Password must contain at least 8 characters (one number and one special character)."
              placeholder="Your new password"
            />
            <PasswordInput label="Confirm your password" withAsterisk placeholder="Confirm your password" />
            <Button>Sign up</Button>
          </Stack>
        </Paper>
      </Flex>
    </Stack>
  );
};

export default SignupPage;
