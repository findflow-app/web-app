import { useState } from "react";
import { PasswordInput, Progress, Text, Popover, Box, rem } from "@mantine/core";
import { Check, X } from "lucide-react";

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
  return (
    <Box c={meets ? "teal" : "red"} style={{ display: "flex", alignItems: "center" }} mt={7} size="sm">
      {meets ? <Check style={{ width: rem(14), height: rem(14) }} /> : <X style={{ width: rem(14), height: rem(14) }} />}{" "}
      <Box ml={10}>{label}</Box>
    </Box>
  );
}

export default PasswordRequirement;
