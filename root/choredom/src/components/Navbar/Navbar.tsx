import { Box, Flex, VStack } from "@chakra-ui/react";
import React from "react";

const Navbar: React.FC = (props: any) => {
  return (
    <Flex width={"15%"} bg="black" height={"100%"}>
      <VStack spacing={4} align={"flex-start"}>
        <Box>
          <h1>Choredom</h1>
        </Box>
        <Box>
          <h2>Your Chores</h2>
        </Box>
        <Box>
          <h2>Social Feed</h2>
        </Box>
        <Box>
          <h2>All Chores</h2>
        </Box>
        <Box>
          <h2>Add Chore</h2>
        </Box>
        <Box>
          <h2>My Account</h2>
        </Box>
        {/* BottomNav */}
      </VStack>
    </Flex>
  );
};

export default Navbar;
