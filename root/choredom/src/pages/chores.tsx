import { Box, Center, Grid, Stack } from "@chakra-ui/react";
import React from "react";
import ChoreTile from "../components/ChoreTile";
import ChoreProps from "../interfaces/ChoreTileInterface";

const ChoreItems: Array<ChoreProps> = [
  {
    toDoDate: "2/14",
    choreName: "Buy a bouquet of flowers",
    choreLocation: "Smiths",
    choreDescription:
      "Try going to Smiths or Lins. They typically have good deals on flowers.",
    choreFrequency: "Every year",
  },
  {
    toDoDate: "2/16",
    choreName: "Laundry",
    choreLocation: "Laundry room",
    choreDescription: "Colors and darks",
    choreFrequency: "Every week",
  },
  {
    toDoDate: "2/15",
    choreName: "Shopping",
    choreFrequency: "Every week",
    choreLocation: "Lululemon",
  },
];

const Chore: React.FC = () => {
  return (
    <Box>
      <Stack direction={"column"} spacing="6" align={"center"} mt="3">
        {ChoreItems.map((chore) => (
          <ChoreTile key={chore.choreName} {...chore}></ChoreTile>
        ))}
      </Stack>
    </Box>
  );
};

export default Chore;
