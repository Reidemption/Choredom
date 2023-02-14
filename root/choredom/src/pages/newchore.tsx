import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/clientApp";

type NewChoreProps = {};

const NewChore: React.FC<NewChoreProps> = () => {
  return <div>New Chore Creation</div>;
};

export default NewChore;
