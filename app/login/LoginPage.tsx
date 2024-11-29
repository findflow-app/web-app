"use client";

import { Anchor, Button, Center, Fieldset, Flex, Paper, Stack, Text, TextInput, Title } from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { login } from "../api/auth";
import { useRedirectIfAuthenticated, useUser } from "../UserProvider";
import { TokenManager } from "../api/tokenmanager";
import { notifications } from "@mantine/notifications";

const LoginPage = () => {
  useRedirectIfAuthenticated();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      TokenManager.setToken(data);
      queryClient.invalidateQueries({ queryKey: ["user"] });

      notifications.show({
        title: "Welcome back!",
        message: "You have successfully logged in",
      });
    },
    onError: (error) => {
      loginForm.setErrors({ email: "Incorrect email or password" });
    },
  });

  const loginForm = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Stack mt={32} align="center">
      <Image src="/logo.svg" alt="Logo" width={300} height={50} style={{ maxWidth: "calc(100vw - 2rem)", marginBottom: 16 }} />

      <Form form={loginForm} onSubmit={(values) => loginMutation.mutate(values)}>
        <Flex direction={"column"} w={500} maw="calc(100vw - 2rem)">
          <Paper withBorder p={16}>
            <Title mb={16} sx={{ textAlign: "center" }}>
              Login
            </Title>

            <Stack>
              <TextInput name="email" required {...loginForm.getInputProps("email")} label="Email" placeholder="Your email" />
              <TextInput
                name="password"
                required
                {...loginForm.getInputProps("password")}
                label="Password"
                placeholder="Your password"
                type="password"
              />
              <Button type="submit" loading={loginMutation.isPending}>
                Login
              </Button>
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
