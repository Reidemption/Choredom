import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/clientApp";

type MyAccountProps = {};

const MyAccount: React.FC<MyAccountProps> = () => {
  return <div>My Account</div>;
};

export default MyAccount;
