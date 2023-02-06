import {
  Box,
  Center,
  Divider,
  Flex,
  Image,
  Stack,
  Text,
  Spacer,
  Input,
  InputGroup,
  Button,
  InputRightElement,
  HStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Link,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { useRouter } from "next/router";

function PasswordInput() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={show ? "text" : "password"}
        placeholder="Enter password"
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}

function LogInUser() {
  console.log("User logged in");
}

function CreateUser() {
  console.log("User created");
}

const noAccount = "Don't have an account?";

export default function Home() {
  const emailRef = useRef<HTMLDivElement>(null);
  const passwordRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  return (
    <div>
      <Flex align={"center"} justify={"center"}>
        <Center w={{ base: "50%", md: "100%" }}>
          <Stack align="center" justify="center">
            <Text fontSize="5xl">Choredom</Text>
            <Image
              w={{ base: "50%", md: "500px" }}
              h={{ base: "50%", md: "500px" }}
              src="/chore_list.svg"
              alt="Man showing off his chores list"
            />
          </Stack>
        </Center>
        <Spacer />
        <Center w={{ base: "50%", md: "100%" }}>
          <Box rounded={"lg"} boxShadow={"lg"} p={8} bg={"white"}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Link color={"blue.400"}>Forgot password?</Link>
                </Stack>
                <Button
                  colorScheme="purple"
                  variant="outline"
                  _hover={{
                    bg: "purple",
                    color: "white",
                  }}
                >
                  Sign in
                </Button>
                <Button
                  colorScheme="purple"
                  _hover={{
                    bg: "purple",
                    color: "white",
                  }}
                >
                  Create Account
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Center>
      </Flex>
    </div>
  );
}
