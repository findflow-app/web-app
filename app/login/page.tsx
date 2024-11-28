import { Button, Center, Fieldset, Flex, Paper, Stack, TextInput, Title } from "@mantine/core";
import Image from "next/image";
import React from "react";

const LoginPage = () => {
  return (
    <Stack mt={32} align="center">
      <Image src="/logo.svg" alt="Logo" width={300} height={100} style={{ maxWidth: "calc(100vw - 2rem)" }} />

      <Flex direction={"column"} w={500} maw="calc(100vw - 2rem)">
        <Paper withBorder p={16}>
          <Title mb={32} sx={{ textAlign: "center" }}>
            Login
          </Title>

          <Stack>
            <TextInput label="Email" placeholder="Your email" />
            <TextInput label="Password" placeholder="Your password" type="password" />
            <Button>Login</Button>
          </Stack>
        </Paper>
      </Flex>
    </Stack>
  );
};

export default LoginPage;
