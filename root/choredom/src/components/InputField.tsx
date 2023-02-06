import { FormControl, Input } from "@chakra-ui/react";
import React from "react";

type InputFieldProps = {
  name: string;
  placeholder: string;
  type: string;
  isRequired?: boolean | false;
  mb?: number;
};

const InputField: React.FC<InputFieldProps> = ({
  name,
  placeholder,
  type,
  isRequired,
  mb,
}) => {
  return (
    <>
      <Input
        bg="gray.50"
        name={name}
        placeholder={placeholder}
        type={type}
        required={isRequired}
        mb={mb}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
      />
    </>
  );
};
export default InputField;
