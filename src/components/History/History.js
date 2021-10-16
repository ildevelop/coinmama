import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Line } from "react-chartjs-2";

import { getHistory, selectHistory } from "../Coins/coinSlice";
import bigChartData from "./Chart";
import { Box, Heading, Stack, Text } from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/button";
const History = () => {
  const dispatch = useDispatch();
  const history = useSelector(selectHistory);
  console.log(history);
  useEffect(() => {
    if (!history.length) {
      dispatch(getHistory());
    }
  }, [dispatch, history]);
  return (
    <div>
      <Stack as={Box} textAlign={"center"} spacing={{ base: 8, md: 16 }} py={{ md: "16" }}>
        <Heading fontWeight={600} fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }} lineHeight={"110%"}>
          The easiest way to{" "}
          <Text as={"span"} color={"green.400"}>
            buy & sell
          </Text>{" "}
          cryptocurrency
        </Heading>
      </Stack>

      {history.map((item) => (
        <Box key={item.coin} h="500px" m="4" border="2px solid" borderColor="gray.500">
          <Line data={(canvas) => bigChartData.data(canvas, item)} options={bigChartData.options} />
        </Box>
      ))}
      <Stack as={Box} textAlign={"center"} align="center" spacing={{ base: 8, md: 16 }} py={{ md: "16" }}>
        <Box width="40">
          <Link to="/">
            <Button w="full" colorScheme="purple" variant="outline">
              Back
            </Button>
          </Link>
        </Box>
      </Stack>
    </div>
  );
};

export default History;
