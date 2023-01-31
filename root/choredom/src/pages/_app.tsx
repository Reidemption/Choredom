import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import theme from "../chakra/theme";
import Navbar from "../components/Navbar/Navbar";
// const router = useRouter();
// const showNavBar =
//   router.pathname === "/login" || router.pathname === "/register"
//     ? false
//     : true;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Navbar>
        <Component {...pageProps} />
      </Navbar>
    </ChakraProvider>
  );
}
