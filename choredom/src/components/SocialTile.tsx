import React from "react";

import {
  Box,
  Center,
  Flex,
  Image,
  Spacer,
  Text,
  VStack,
  Stack,
} from "@chakra-ui/react";
import SocialTileProps from "../interfaces/SocialTileInterface";
import { useMediaQuery } from '@chakra-ui/media-query'

const SocialTile: React.FC<SocialTileProps> = (props) => {
  const [isSmallScreen] = useMediaQuery('(max-width: 768px)')

  if (!props.image) {
    return (
      <Flex
        m={5}
        align="center"
        justify="center"
        border={"1px"}
        borderColor={"blackAlpha.400"}
        maxWidth={600}
      >
        <Stack direction="column" align='center' >
          <Flex my='4'>
            <Text textAlign={'center'} fontSize={'xs'} w={125}>
              {props.choreStory}
            </Text>
          </Flex>
        </Stack>
      </Flex>
    )
  }

  if (isSmallScreen) {
    return (
			<Flex
				m={5}
				align='center'
				justify='center'
				border={'1px'}
				borderColor={'blackAlpha.400'}
				maxWidth={600}
				minH={300}
			>
        <Stack direction="column" align='center' >
					{props.image && (
						<Image
							src={props.image}
							alt={props.imageAlt}
							p={5}
							w={400}
							h={300}
						/>
          )}
          <Flex pb='4'>
            <Text textAlign={'center'} fontSize={'xs'} w={125}>
              {props.choreStory}
            </Text>
          </Flex>
				</Stack>
			</Flex>
		)
  }

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
