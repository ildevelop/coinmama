import { Box, Heading, Container, Text, Stack } from "@chakra-ui/react";

export default function Header() {
  return (
    <>
      <Container maxW={"4xl"}>
        <Stack as={Box} textAlign={"center"} spacing={{ base: 8, md: 16 }} py={{ md: "16" }}>
          <Heading fontWeight={600} fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }} lineHeight={"110%"}>
            The easiest way to{" "}
            <Text as={"span"} color={"green.400"}>
              buy & sell
            </Text>{" "}
            cryptocurrency
          </Heading>
          <Text fontSize="2xl" color={"gray.500"}>
            Trusted by over 3,000,000 people across 188 countries since 2013
          </Text>
        </Stack>
      </Container>
    </>
  );
}
