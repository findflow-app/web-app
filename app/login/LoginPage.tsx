"use client";

import { Anchor, Button, Center, Fieldset, Flex, Paper, Stack, Text, TextInput, Title } from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  const loginForm = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Stack mt={32} align="center">
      <Image src="/logo.svg" alt="Logo" width={300} height={50} style={{ maxWidth: "calc(100vw - 2rem)", marginBottom: 16 }} />

      <Form form={loginForm} onSubmit={(values) => console.log(values)}>
        <Flex direction={"column"} w={500} maw="calc(100vw - 2rem)">
          <Paper withBorder p={16}>
            <Title mb={16} sx={{ textAlign: "center" }}>
              Login
            </Title>

            <Stack>
              <TextInput required {...loginForm.getInputProps("email")} label="Email" placeholder="Your email" />
              <TextInput required {...loginForm.getInputProps("password")} label="Password" placeholder="Your password" type="password" />
              <Button type="submit">Login</Button>
            </Stack>
          </Paper>
        </Flex>

        <Text ta="center" mt={16}>
          Don't have an account?{" "}
          <Anchor component={Link} href="/signup" variant="link">
            Sign up
          </Anchor>
        </Text>
      </Form>
    </Stack>
  );
};

export default LoginPage;
