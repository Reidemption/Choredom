import React from "react";
import SocialTile from "@/src/components/SocialTile";
import { Box, Center, Grid } from "@chakra-ui/react";

interface FeedProps {}

const Feed: React.FC<FeedProps> = () => {
  return (
    <Center>
      <Box
        style={{ overflowY: "scroll", height: "100vh" }}
        __css={{
          "&::-webkit-scrollbar": {
            w: "2",
          },
          "&::-webkit-scrollbar-track": {
            w: "6",
            bg: `red.200`,
            // TODO: Make this the same as the background color
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: "10",
            bg: `gray.800`,
          },
        }}
      >
        <Grid templateColumns="repeat(2, 1fr)" gap={6} mx={10}>
          <SocialTile
            finishedDate="10/7"
            choreTitle="Took over the entire world together :^)"
            // choreTitle="Just got married :)"
            image="../us.jpg"
            imageAlt="The happy couple"
            choreStory="We got married in the mountains. It was a beautiful day."
          />
          <SocialTile
            finishedDate="10/7"
            choreTitle="Took over the entire world together :^)"
            // choreTitle="Just got married :)"
            image="../us.jpg"
            imageAlt="The happy couple"
            choreStory="We got married in the mountains. It was a beautiful day."
          />
        </Grid>
      </Box>
    </Center>
  );
};

export default Feed;
