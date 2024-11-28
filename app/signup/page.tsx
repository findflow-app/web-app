"use client";

import { Button, Center, Fieldset, Flex, Paper, Stack, TextInput, Title } from "@mantine/core";
import Image from "next/image";
import React from "react";
import { useState } from "react";
import { PasswordInput, Progress, Text, Popover, Box, rem } from "@mantine/core";
import PasswordRequirement from "./PasswordRequirement";

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
  const [value, setValue] = useState("");
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(value)} />
  ));

  const strength = getStrength(value);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

  return (
    <Stack mt={32} align="center">
      <Image src="/logo.svg" alt="Logo" width={300} height={100} style={{ maxWidth: "calc(100vw - 2rem)" }} />

      <Flex direction={"column"} w={500} maw="calc(100vw - 2rem)">
        <Paper withBorder p={16} radius="md">
          <Title mb={32} sx={{ textAlign: "center" }}>
            Sign up
          </Title>

          <Stack>
            <TextInput label="Email" withAsterisk placeholder="Your email" />
            <TextInput label="Username" withAsterisk placeholder="Your username" />

            <Popover opened={popoverOpened} position="bottom" width="target" transitionProps={{ transition: "pop" }}>
              <Popover.Target>
                <div onFocusCapture={() => setPopoverOpened(true)} onBlurCapture={() => setPopoverOpened(false)}>
                  <PasswordInput
                    label="Password"
                    withAsterisk
                    description="Password must contain at least 8 characters (one number and one special character)."
                    placeholder="Your new password"
                    value={value}
                    onChange={(event) => setValue(event.currentTarget.value)}
                  />
                </div>
              </Popover.Target>

              <Popover.Dropdown>
                <Progress color={color} value={strength} size={5} mb="xs" />
                <PasswordRequirement label="Includes at least 8 characters" meets={value.length > 7} />
                {checks}
              </Popover.Dropdown>
            </Popover>

            <PasswordInput label="Confirm your password" withAsterisk placeholder="Confirm your password" />
            <Button>Sign up</Button>
          </Stack>
        </Paper>
      </Flex>
    </Stack>
  );
};

export default SignupPage;
