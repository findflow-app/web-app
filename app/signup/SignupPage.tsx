"use client";

import { Anchor, Button, Flex, Paper, PasswordInput, Popover, Progress, Stack, Text, TextInput, Title } from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import Image from "next/image";
import { useState } from "react";
import PasswordRequirement from "./PasswordRequirement";
import Link from "next/link";

const requirements = [
  { re: /[0-9]/, label: "Includes number" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

function getStrength(password: string) {
  if (password.length < 8) return 0;

  let multiplier = password.length > 7 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

const SignupPage = () => {
  const [popoverOpened, setPopoverOpened] = useState(false);

  const signupForm = useForm({
    initialValues: {
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
      phone: "",
    },
    validate: {
      confirmPassword: (v, values) => (v === values.password ? null : "Passwords do not match"),
      email: (v) => (/\S+@\S+\.\S+/.test(v) ? null : "Invalid email"),
      password: (v) => (getStrength(v) == 100 ? null : "Password is too weak"),
    },
  });

  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(signupForm.values.password)} />
  ));

  const strength = getStrength(signupForm.values.password);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

  return (
    <Stack mt={32} align="center">
      <Image src="/logo.svg" alt="Logo" width={300} height={50} style={{ maxWidth: "calc(100vw - 2rem)", marginBottom: 16 }} />

      <Form form={signupForm} onSubmit={(values) => console.log(values)}>
        <Flex direction={"column"} w={500} maw="calc(100vw - 2rem)">
          <Paper withBorder p={16} radius="md">
            <Title mb={16} sx={{ textAlign: "center" }}>
              Sign up
            </Title>

            <Text mb={8} size="sm">
              Fields with{" "}
              <Text span c="red.7">
                *
              </Text>{" "}
              are required
            </Text>

            <Stack>
              <TextInput label="Full name" required placeholder="Your full name" {...signupForm.getInputProps("name")} />
              <TextInput label="Email" required placeholder="Your email" {...signupForm.getInputProps("email")} />
              <TextInput label="Phone number" placeholder="Your phone number" {...signupForm.getInputProps("phone")} />

              <Popover opened={popoverOpened} position="bottom" width="target" transitionProps={{ transition: "pop" }}>
                <Popover.Target>
                  <div onFocusCapture={() => setPopoverOpened(true)} onBlurCapture={() => setPopoverOpened(false)}>
                    <PasswordInput label="Password" required placeholder="Your new password" {...signupForm.getInputProps("password")} />
                  </div>
                </Popover.Target>

                <Popover.Dropdown>
                  <Progress color={color} value={strength} size={5} mb="xs" />
                  <PasswordRequirement label="Includes at least 8 characters" meets={signupForm.values.password.length > 7} />
                  {checks}
                </Popover.Dropdown>
              </Popover>

              <PasswordInput
                label="Confirm your password"
                required
                placeholder="Confirm your password"
                {...signupForm.getInputProps("confirmPassword")}
              />
              <Button type="submit">Sign up</Button>
            </Stack>
          </Paper>
        </Flex>
      </Form>

      <Text ta="center" mt={16} mb={32}>
        Already have an account?{" "}
        <Anchor component={Link} href="/login" variant="link">
          Login here
        </Anchor>
      </Text>
    </Stack>
  );
};

export default SignupPage;
