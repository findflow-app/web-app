"use client";

import NextImage from "next/image";
import React from "react";

import logo from "@/app/assets/logo.svg";
import { useColorScheme } from "@mantine/hooks";
import { Box, Image, useMantineColorScheme } from "@mantine/core";
import { useClient } from "../hooks/useClient";

const AdminImage = () => {
  const { colorScheme } = useMantineColorScheme();
  const client = useClient();
  if (!client) return null;

  return (
    <Image
      src={"/logoblack.svg"}
      w={120}
      alt="asd"
      style={{
        filter: colorScheme === "dark" ? "invert(1)" : "invert(0)",
      }}
    />
  );
};

export default AdminImage;
