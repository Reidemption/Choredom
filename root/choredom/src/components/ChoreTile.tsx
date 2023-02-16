import {
  Box,
  Center,
  Checkbox,
  Flex,
  Stack,
  Spacer,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import ChoreTileProps from "../interfaces/ChoreTileInterface";

const ChoreTile: React.FC<ChoreTileProps> = (props) => {
  return (
    <Flex
      align="center"
      justify="center"
      border={"1px"}
      borderColor={"blackAlpha.400"}
      w={500} //Make this responsive
      bg={"white"}
    >
      <Flex w="100%" m={5}>
        <Checkbox colorScheme="purple" w="10%"></Checkbox>
        <Spacer />
        <HStack spacing={3} w="35%">
          <VStack spacing={0}>
            <Text>{props.toDoDate}</Text>
            <Text mt={0}>{props.choreName}</Text>
            <Text textAlign={"center"} as="i">
              {props.choreFrequency}
            </Text>
          </VStack>
        </HStack>
        <Spacer />
        <Box width={"50%"}>
          <Text fontSize={"sm"}>{props.choreDescription}</Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default ChoreTile;
