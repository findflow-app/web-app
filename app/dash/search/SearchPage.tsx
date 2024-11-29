"use client";

import React from "react";
import SearchInput from "./SearchInput";
import { useQuery } from "@tanstack/react-query";
import { getUserLocation } from "@/app/api/search";
import ColorBox from "./ColorBox";
import { Box, Flex, Paper, Stack, Text, Title } from "@mantine/core";
import styles from "./SearchPage.module.scss";

const positions: { [key: string]: { x: number; y: number } } = {
  "24:58:7C:01:23:DE": { x: 10, y: 10 },
  "80:65:99:8A:EA:72": { x: 10, y: 550 },
  "80:65:99:89:AB:AE": { x: 550, y: 10 },
  "80:65:99:93:27:96": { x: 550, y: 550 },
};

const SearchPage = () => {
  const [selectedUser, setSelectedUser] = React.useState<number | null>(null);

  const getLocationQuery = useQuery({
    queryKey: ["location", selectedUser],
    queryFn: async () => getUserLocation(selectedUser!),
    enabled: !!selectedUser,
    initialData: null,
    refetchInterval: 1000,
  });

  console.log("tady tu", getLocationQuery.data);

  const mac = getLocationQuery.data?.mac;
  const title = getLocationQuery.data?.type;

  console.log("mac", mac);

  return (
    <Stack w={600} mx="auto">
      <SearchInput onUserSelect={(s) => setSelectedUser(+s)} />

      {getLocationQuery.isLoading && <p>Loading location...</p>}

      {getLocationQuery.data && (
        <>
          <Title order={1} mt={16} mb={0}>
            Beacon: {title}
          </Title>
          <Text mb={16} size="xl" c="dimmed">
            Since {new Date(getLocationQuery.data.timestamp).toLocaleTimeString()}
          </Text>
          <Paper w={600} h={600} pos="relative" withBorder>
            {/* <ColorBox color={mac === "24:58:7C:01:23:DE" ? "green" : "red"} />
        <ColorBox color={mac === "80:65:99:8A:EA:72" ? "green" : "red"} />
        <ColorBox color={mac === "80:65:99:89:AB:AE" ? "green" : "red"} />
        <ColorBox color={mac === "80:65:99:93:27:96" ? "green" : "red"} /> */}

            {mac && (
              <Box
                w={40}
                h={40}
                bg="blue"
                className={styles.dot}
                sx={{
                  position: "absolute",
                  borderRadius: "50%",
                  top: positions[mac].y,
                  left: positions[mac].x,
                  transition: "top 700ms, left 700ms",
                }}
              ></Box>
            )}
          </Paper>
        </>
      )}
    </Stack>
  );
};

export default SearchPage;
