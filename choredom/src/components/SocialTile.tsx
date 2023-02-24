import React from "react";

import {
  Box,
  Center,
  Flex,
  Image,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import SocialTileProps from "../interfaces/SocialTileInterface";

const SocialTile: React.FC<SocialTileProps> = (props) => {
  return (
    <Flex
      m={5}
      align="center"
      justify="center"
      border={"1px"}
      borderColor={"blackAlpha.400"}
      maxWidth={600}
      minH={300}
    >
      <Center>
        {props.image && (
          <Image
            src={props.image}
            alt={props.imageAlt}
            p={10}
            w={400}
            h={300}
          />
        )}
      </Center>
      <Spacer />
      <VStack align="center" justify="center" spacing={1} pr={5} maxW={200}>
        <Text textAlign={"center"}>{props.choreTitle}</Text>
        <Box
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          ml="2"
        >
          {props.finishedDate}
        </Box>
        <Text textAlign={"center"} fontSize={"xs"} w={125}>
          {props.choreStory}
        </Text>
      </VStack>
    </Flex>
  );
};

export default SocialTile;
