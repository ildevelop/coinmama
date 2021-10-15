import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCoins, selectCions } from "./coinSlice";
import { Box, Stack, HStack, Heading, Text, VStack, useColorModeValue, List, ListItem, ListIcon, Button } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";

function PriceWrapper({ children }) {
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: "center", lg: "flex-start" }}
      borderColor={useColorModeValue("gray.200", "gray.500")}
      borderRadius={"xl"}
    >
      {children}
    </Box>
  );
}

export function Coins() {
  const dispatch = useDispatch();
  const coins = useSelector(selectCions);
  console.log(coins);
  const getPercent = (start, end) => Math.round((end * 100) / start - 100);
  useEffect(() => {
    if (!Object.keys(coins).length) {
      dispatch(getCoins());
    }
  }, [dispatch, coins]);
  return (
    <Box>
      <VStack spacing={2} textAlign="center">
        <Heading as="h1" fontSize="2xl">
          Become a part of the financial revolution
        </Heading>
      </VStack>
      <Stack direction={{ base: "column", md: "row" }} textAlign="center" justify="center" spacing={{ base: 4, lg: 10 }} py={10}>
        <PriceWrapper>
          <Box py={4} px={12}>
            <Text fontWeight="500" fontSize="2xl">
              LTC
            </Text>
            <HStack justifyContent="center">
              <Text fontSize="3xl" fontWeight="600">
                $
              </Text>
              <Text fontSize="3xl" fontWeight="900">
                {coins?.LTC?.last}
              </Text>
              <Text color="green.400">{getPercent(coins?.LTC?.open, coins?.LTC?.last)}%</Text>
            </HStack>
          </Box>
          <VStack bg={useColorModeValue("gray.50", "gray.700")} py={4} borderBottomRadius={"xl"}>
            <List spacing={3} textAlign="start" px={12}>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Centralization of wealth far exceeds Bitcoin
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Strong industry and, as well as name recognition
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Strong community support
              </ListItem>
            </List>
            <Box w="80%" pt={7}>
              <Button w="full" colorScheme="purple" variant="outline">
                Buy now
              </Button>
            </Box>
          </VStack>
        </PriceWrapper>

        <PriceWrapper>
          <Box position="relative">
            <Box position="absolute" top="-16px" left="50%" style={{ transform: "translate(-50%)" }}>
              <Text textTransform="uppercase" bg={"purple.500"} color={"white"} px={3} py={1} fontSize="sm" fontWeight="600" rounded="xl">
                Most Popular
              </Text>
            </Box>
            <Box py={4} px={12}>
              <Text fontWeight="500" fontSize="2xl">
                BTC
              </Text>
              <HStack justifyContent="center">
                <Text fontSize="3xl" fontWeight="600">
                  $
                </Text>
                <Text fontSize="3xl" fontWeight="900">
                  {coins?.BTC?.last}
                </Text>
                <Text color="green.400">{getPercent(coins?.BTC?.open, coins?.BTC?.last)}%</Text>
              </HStack>
            </Box>
            <VStack bg={useColorModeValue("gray.50", "gray.700")} py={4} borderBottomRadius={"xl"}>
              <List spacing={3} textAlign="start" px={12}>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Massive market dominance
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Traded virtually everywhere crypto is traded
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Global ecosystem and brand recognition
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Active core and third-party development
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Primary on- and off-ramp to fiat currencies
                </ListItem>
              </List>
              <Box w="80%" pt={7}>
                <Button w="full" bg="purple.700" color="white" _hover={{ bg: "purple.500" }}>
                  Buy now
                </Button>
              </Box>
            </VStack>
          </Box>
        </PriceWrapper>
        <PriceWrapper>
          <Box py={4} px={12}>
            <Text fontWeight="500" fontSize="2xl">
              ETH
            </Text>
            <HStack justifyContent="center">
              <Text fontSize="3xl" fontWeight="600">
                $
              </Text>
              <Text fontSize="3xl" fontWeight="900">
                {coins?.ETH?.last}
              </Text>
              <Text color="green.400">{getPercent(coins?.ETH?.open, coins?.ETH?.last)}%</Text>
            </HStack>
          </Box>
          <VStack bg={useColorModeValue("gray.50", "gray.700")} py={4} borderBottomRadius={"xl"}>
            <List spacing={3} textAlign="start" px={12}>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Ethereum 2.0 upgrade as expected
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Operate on Proof of Stake (PoS)
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                The capital locked up in DeFi smart contracts
              </ListItem>
            </List>
            <Box w="80%" pt={7}>
              <Button w="full" colorScheme="purple" variant="outline">
                Buy now
              </Button>
            </Box>
          </VStack>
        </PriceWrapper>
      </Stack>
    </Box>
  );
}
