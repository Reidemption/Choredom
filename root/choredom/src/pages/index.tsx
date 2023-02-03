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
} from "@chakra-ui/react";
import React from "react";
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
  const router = useRouter();

  return (
    <div>
      <Flex>
        <Center w={{ base: "50%", md: "100%" }}>
          <Stack align="center" justify="center">
            <Text fontSize="5xl">Choredom</Text>
            <Image
              w={{ base: "300px", md: "500px" }}
              h={{ base: "300px", md: "500px" }}
              src="/chore_list.svg"
              alt="Man showing off his chores list"
            />
          </Stack>
        </Center>
        <Spacer />
        <Center w={{ base: "50%", md: "100%" }}>
          <Box>
            <Stack align="center" justify="center">
              <h2>Sign In</h2>
              <Input variant="outline" placeholder="Username"></Input>
              <PasswordInput />
              <Button onClick={LogInUser} colorScheme="purple">
                Log In
              </Button>

              <Divider></Divider>
              <h4>{noAccount}</h4>
              <Button
                colorScheme="purple"
                onClick={() => router.push("/register")}
                variant="outline"
              >
                <a href=""></a>
                Sign Up
              </Button>
            </Stack>
          </Box>
        </Center>
      </Flex>
    </div>
  );
}
