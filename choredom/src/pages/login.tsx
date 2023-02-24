import React, { useState } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../firebase/clientApp";
import { FIREBASE_ERRORS } from "../firebase/errors";
import InputItem from "../components/InputItem";

// TODO: Eventually I plan on making the app route to this page if the user is not logged in.
// When that happens I'll copy everything from index.tsx and paste it here. and make index the main page.

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState("");

  const [signInWithEmailAndPassword, _, loading, authError] =
    useSignInWithEmailAndPassword(auth);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formError) setFormError("");
    if (!form.email.includes("@")) {
      return setFormError("Please enter a valid email");
    }

    // Valid form inputs
    signInWithEmailAndPassword(form.email, form.password);
  };

  const onChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      <InputItem
        name="email"
        placeholder="email"
        type="text"
        mb={2}
        onChange={onChange}
      />
      <InputItem
        name="password"
        placeholder="password"
        type="password"
        onChange={onChange}
      />
      <Text textAlign="center" mt={2} fontSize="10pt" color="red">
        {formError ||
          FIREBASE_ERRORS[authError?.message as keyof typeof FIREBASE_ERRORS]}
      </Text>
      <Button
        width="100%"
        height="36px"
        mb={2}
        mt={2}
        type="submit"
        isLoading={loading}
      >
        Log In
      </Button>
      <Flex justifyContent="center" mb={2}>
        <Text fontSize="9pt" mr={1}>
          Forgot your password?
        </Text>
        <Text fontSize="9pt" color="blue.500" cursor="pointer">
          Reset
        </Text>
      </Flex>
      <Flex fontSize="9pt" justifyContent="center">
        <Text mr={1}>New here?</Text>
        <Text color="blue.500" fontWeight={700} cursor="pointer">
          SIGN UP
        </Text>
      </Flex>
    </form>
  );
};
export default Login;
