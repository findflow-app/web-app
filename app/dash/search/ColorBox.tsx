import { Box } from "@mantine/core";
import React, { FC } from "react";

interface ColorBoxProps {
  color: string;
}

const ColorBox: FC<ColorBoxProps> = ({ color }) => {
  return (
    <Box
      bg={color}
      w={300}
      h={300}
      sx={{
        transition: "background-color 200ms",
      }}
    ></Box>
  );
};

export default ColorBox;
