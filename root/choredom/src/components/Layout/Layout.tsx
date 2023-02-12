import React, { ReactNode, useEffect } from "react";
// import Navbar from "../Navbar/Navbar";
import {
  Box,
  Button,
  Divider,
  Flex,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
// import { authState } from "../../atoms/authState";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import { signOut } from "firebase/auth";
import UserNav from "./UserNav";
interface LayoutProps {
  children?: ReactNode;
  // any props that come into the component
}

const Layout: React.FC = ({ children }: LayoutProps) => {
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      console.log("User is logged in", user);
    }
  }, [user]);

  return (
    <>
      {user ? (
        <Flex height={"100vh"}>
          <VStack
            spacing={4}
            align={"flex-start"}
            bg={"tomato"}
            px={"5"}
            pt={"4"}
          >
            <Box>
              <Text fontSize={"3xl"}>Choredom</Text>
            </Box>
            <Box>
              <h2>Your Chores</h2>
            </Box>
            <Box>
              <h2>Social Feed</h2>
            </Box>
            <Box>
              <h2>All Chores</h2>
            </Box>
            <Box>
              <h2>Add Chore</h2>
            </Box>
            <Box>
              <h2>My Account</h2>
            </Box>
            <Divider />
            <Spacer />

            <UserNav user={user} />
            <Divider />
            <Box pb={"4"}>
              <Button
                onClick={() => {
                  signOut(auth);
                }}
              >
                Log Out
              </Button>
            </Box>
          </VStack>
          <main>{children}</main>
        </Flex>
      ) : (
        <main>{children}</main>
      )}
    </>
  );
};

export default Layout;

// TODO: Align all content into the center of the page
