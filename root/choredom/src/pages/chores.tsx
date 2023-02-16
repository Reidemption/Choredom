import { Box, Center, Grid, Stack } from "@chakra-ui/react";
import React from "react";
import ChoreTile from "../components/ChoreTile";

interface ChoreProps {
  toDoDate: string;
  choreName: string;
  choreDescription?: string;
  choreFrequency?: string;
}

const ChoreItems: Array<ChoreProps> = [
  {
    toDoDate: "2/14",
    choreName: "Buy a bouquet of flowers",
    choreDescription:
      "Try going to Smiths or Lins. They typically have good deals on flowers.",
    choreFrequency: "Every year",
  },
  {
    toDoDate: "2/16",
    choreName: "Laundry",
    choreDescription: "Colors and darks",
    choreFrequency: "Every week",
  },
  { toDoDate: "2/15", choreName: "Shopping", choreFrequency: "Every week" },
];

const Chore: React.FC = () => {
  return (
    <Box>
      <Stack direction={"column"} spacing="6" align={"center"} mt="3">
        {ChoreItems.map((chore) => (
          <ChoreTile
            key={chore.choreName}
            toDoDate={chore.toDoDate}
            choreName={chore.choreName}
            choreDescription={chore.choreDescription}
            choreFrequency={chore.choreFrequency}
          ></ChoreTile>
        ))}
      </Stack>
    </Box>
  );
};

export default Chore;
