import React from "react";

interface UserNavProps {
  user: any;
}

const UserNav: React.FC<UserNavProps> = ({ user }) => {
  return <div>{user?.email}</div>;
};

export default UserNav;
