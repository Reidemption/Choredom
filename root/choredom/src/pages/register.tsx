import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";

import React from "react";
import { useRouter } from "next/router";

function GoBack() {
  const router = useRouter();
  const handleClick = () => router.back();

  return (
    <Button
      onClick={handleClick}
      colorScheme="purple"
      variant="outline"
      m="5"
      px="15"
    >
      Go Back
    </Button>
  );
}
type PasswordInputProps = {
  placeholder: string;
};

function PasswordInput({ placeholder }: PasswordInputProps) {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={show ? "text" : "password"}
        placeholder={placeholder}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}

function createAccount() {
  console.log("User created");
}

const signUp = () => {
  return (
    <Flex>
      <GoBack />
      <Center w={{ base: "50%", md: "100%" }}>
        <Box boxShadow="base">
          <Stack align="center" justify="center" py="8" px="8">
            <h2>Sign In</h2>
            <Input variant="outline" placeholder="Username"></Input>
            <PasswordInput placeholder="Password" />
            <PasswordInput placeholder="Confirm Password" />
            <Button onClick={createAccount} colorScheme="purple">
              Create Account
            </Button>
          </Stack>
        </Box>
      </Center>
      <Spacer />
      <Center w={{ base: "50%", md: "100%" }}>
        <Stack align="center" justify="center">
          <Image
            w={{ base: "300px", md: "500px" }}
            h={{ base: "300px", md: "500px" }}
            src="/create_account.svg"
            alt="Man showing off his chores list"
          />
        </Stack>
      </Center>
    </Flex>
  );
};
export default signUp;
