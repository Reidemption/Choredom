import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    100: "#011627", // darkblue color
    900: "#FDFFFC", // white color
  },
  styles: {
    global: () => ({
      body: {
        bg: "#94A1B2",
      },
    }),
  },
  components: {
    // Button: {
  },
};

const theme = extendTheme({ colors });

export default theme;
