"use client";

import Image from "next/image";
import { Box, Button, Group, Stack, Text } from "@mantine/core";
import logo from "../assets/logo.svg";
import Link from "next/link";
import styles from "./Home.module.scss";
import { useEffect, useState } from "react";
import BlinkDot from "./BlinkDot";

interface DotObject {
  x: number;
  y: number;
}

export default function Home() {
  const [dots, setDots] = useState<DotObject[]>([]);
  const DOT_SPAWN_RATE = 1000;

  const addDot = () => {
    const newDot = {
      x: Math.random(),
      y: Math.random(),
    };
    setDots((prev) => [...prev, newDot]);

    if (dots.length > 50) {
      setDots((prev) => prev.slice(1));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      addDot();

      if (Math.random() < 0.15) {
        // set timer to add 6 new dots at in quick succession
        const int = setInterval(() => {
          addDot();
        }, 200);

        setTimeout(() => {
          clearInterval(int);
        }, 600);
      }
    }, DOT_SPAWN_RATE);

    return () => clearInterval(interval);
  }, []);

  console.log(dots);

  return (
    <Box
      sx={{
        minWidth: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
      className={styles.home}
    >
      {dots.map((dot, index) => (
        <BlinkDot key={index} x={dot.x} y={dot.y} />
      ))}

      <Stack align="center" gap={32}>
        <Text>Welcome to</Text>
        <Image
          src={logo}
          alt="Logo"
          style={{
            maxWidth: "calc(100% - 2rem)",
          }}
        />
        <Group>
          <Text c="dimmed">This project is coming soon. Check back later for more updates.</Text>
        </Group>
      </Stack>
    </Box>
  );
}
