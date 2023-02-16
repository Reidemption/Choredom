import { Box, Center, Grid, Stack } from "@chakra-ui/react";
import React from "react";
import ChoreTile from "../components/ChoreTile";

const Chore: React.FC = () => {
  return (
    <Box>
      <Stack direction={"column"} spacing="6" align={"center"}>
        <ChoreTile
          toDoDate="2/14"
          choreName="Buy a bouquet of flowers"
          choreDescription="Try going to Smiths or Lins. They typically have good deals on flowers."
          choreFrequency="Every year"
        ></ChoreTile>
        <ChoreTile
          toDoDate="2/14"
          choreName="Laundry"
          choreDescription="Colors and darks"
          choreFrequency="Every week"
        ></ChoreTile>
        <ChoreTile
          toDoDate="2/15"
          choreName="Shopping"
          choreFrequency="Every week"
        ></ChoreTile>
      </Stack>
    </Box>
  );
};

export default Chore;
