import React from "react";

import { Box, Flex, Image } from "@chakra-ui/react";

interface SocialTileProps {
  image?: string;
  imageAlt?: string;
  finishedDate: string;
  choreTitle: string;
  choreStory?: string;
}

const SocialTile: React.FC<SocialTileProps> = (props) => {
  return (
    <Box borderWidth="1px" borderRadius="lg">
      <Image src={props.image} alt={props.imageAlt} p={10} />
      <Flex>
        <Box p="6">
          {props.choreTitle}
          <Box display="flex" alignItems="baseline">
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              ml="2"
            >
              {props.finishedDate}
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default SocialTile;
