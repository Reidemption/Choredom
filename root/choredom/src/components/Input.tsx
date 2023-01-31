import { Input } from "@chakra-ui/react";

function mInput(props: { placeholder: string | undefined }) {
  return <Input placeholder={props.placeholder} variant="outline" />;
}
