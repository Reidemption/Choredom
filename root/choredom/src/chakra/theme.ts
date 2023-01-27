import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    100: "#011627", // darkblue color
    900: "#FDFFFC", // white color
  },
  styles: {
    global: () => ({
      body: {
        bg: "blue.800",
      },
    }),
  },
  components: {
    // Button: {
  },
};

const theme = extendTheme({ colors });

export default theme;
