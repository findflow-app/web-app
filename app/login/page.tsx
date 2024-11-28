import { Button, Center, Fieldset, Flex, Paper, Stack, TextInput, Title } from "@mantine/core";
import React from "react";

const LoginPage = () => {
  return (
    <Center mt={32}>
      <Flex direction={"column"} w={500}>
        <Paper withBorder p={16}>
          <Title
            sx={{
              color: "blue",
            }}
          >
            Login
          </Title>

          <Stack>
            <TextInput label="Email" placeholder="Your email" />
            <TextInput label="Password" placeholder="Your password" type="password" />
            <Button>Login</Button>
          </Stack>
        </Paper>
      </Flex>
    </Center>
  );
};

export default LoginPage;
