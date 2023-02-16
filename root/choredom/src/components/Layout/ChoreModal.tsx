import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  Flex,
  Icon,
  Link,
  FormLabel,
  Input,
  Textarea,
  FormControl,
  Stack,
  Checkbox,
  Spacer,
  Select,
  FormHelperText,
} from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import { useState } from "react";

export default function VerticallyCenter() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [choreForm, setChoreForm] = useState({
    choreName: "",
    choreDate: "",
    repeated: false,
    choreLocation: "",
    choreNumFrequency: 0,
    choreFrequency: "",
    choreDescription: "",
  });
  const [formError, setFormError] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
  };

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setChoreForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked);
    setChoreForm({ ...choreForm, repeated: e.target.checked });
  };

  return (
    <>
      <Flex
        onClick={onOpen}
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
      >
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{
            color: "white",
          }}
          as={FiEdit}
        />
        Add Chore
      </Flex>

      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <form onSubmit={onSubmit}>
          <ModalContent maxW="40rem">
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack direction={"column"} spacing={2}>
                <FormControl isRequired>
                  <FormLabel mb={0}>Chore Name</FormLabel>
                  <Input id="choreName" name="choreName" onChange={onChange} />
                </FormControl>
                <Stack direction="row" alignItems={"center"}>
                  <FormControl isRequired>
                    <FormLabel mb={0}>Chore Date</FormLabel>
                    <Input
                      id="choreDate"
                      name="choreDate"
                      onChange={onChange}
                      type="date"
                    />
                  </FormControl>
                  <Checkbox
                    pt={4}
                    id="repeated"
                    name="repeated"
                    onChange={onCheckboxChange}
                    isChecked={choreForm.repeated}
                  >
                    Repeated?
                  </Checkbox>
                </Stack>
                {choreForm.repeated && (
                  <FormControl isRequired>
                    <Select onChange={onChange}>
                      <option value="day">Daily</option>
                      <option value="week">Weekly</option>
                      <option value="2week">Bi-Weekly</option>
                      <option value="month">Monthly</option>
                      <option value="quarter">Quarterly</option>
                      <option value="year">Yearly</option>
                    </Select>
                  </FormControl>
                )}
                <FormControl isRequired>
                  <FormLabel mb={0}>Chore Location</FormLabel>
                  <Input
                    id="choreLocation"
                    name="choreLocation"
                    onChange={onChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel mb={0}>Chore Description</FormLabel>
                  <Textarea
                    id="choreDescription"
                    name="choreDescription"
                    onChange={onChange}
                  />
                </FormControl>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme={"purple"} type="submit">
                Create Chore
              </Button>
              <Spacer />
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
