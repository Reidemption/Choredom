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
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";

import React, { useState } from "react";
import { useRouter } from "next/router";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../firebase/clientApp";
import { create } from "lodash";
import { FIREBASE_ERRORS } from "../firebase/errors";

function GoBack() {
  const router = useRouter();
  const handleClick = () => router.push("/");

  return (
    <Button onClick={handleClick} colorScheme="purple" variant="outline" m="5">
      Go Back
    </Button>
  );
}

const SignUp: React.FC = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [confirmShow, setConfirmShow] = useState(false);
  const handleConfirmClick = () => setConfirmShow(!confirmShow);
  const router = useRouter();

  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState("");
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formError) setFormError("");
    if (!signUpForm.email.includes("@")) {
      return setFormError("Please enter a valid email");
    }
    if (signUpForm.password !== signUpForm.confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }
    if (signUpForm.password.length < 8) {
      setFormError("Password must be at least 8 characters.");
      return;
    }
    console.log(signUpForm.password);
    console.log(signUpForm.confirmPassword);
    createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);

    if (!error) {
      router.push("/chores");
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Flex>
      <GoBack />
      <Flex align={"center"} justify={"center"}>
        <Center w={{ base: "50%", md: "100%" }}>
          <Box rounded={"lg"} boxShadow={"lg"} p={8} bg={"white"}>
            <Stack spacing={5}>
              <form onSubmit={onSubmit}>
                <FormLabel>Email address</FormLabel>
                <Input
                  id="email"
                  required
                  size="md"
                  type="email"
                  name="email"
                  onChange={onChange}
                ></Input>
                <FormLabel mt="3">Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    id="password"
                    required
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    onChange={onChange}
                    name="password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormLabel mt="3">Confirm Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    id="confirmPassword"
                    required
                    pr="4.5rem"
                    type={confirmShow ? "text" : "password"}
                    onChange={onChange}
                    name="confirmPassword"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleConfirmClick}>
                      {confirmShow ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {(formError || error) && (
                  <Text color="red.500">
                    {formError ||
                      FIREBASE_ERRORS[
                        error?.message as keyof typeof FIREBASE_ERRORS
                      ]}
                  </Text>
                )}
                <Button
                  w={"100%"}
                  colorScheme="purple"
                  type="submit"
                  mt={"5"}
                  isLoading={loading}
                >
                  Create Account
                </Button>
              </form>
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
              alt="Woman creating an account"
            />
          </Stack>
        </Center>
      </Flex>
    </Flex>
  );
};
export default SignUp;
