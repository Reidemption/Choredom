import { BaseUser, User } from "./user.interface";
import { Users } from "./users.interface";


let users: Users = {
  1: {
    id: 1,
    first_name: "Reid",
    last_name: "Gubler",
    password: "asdf1234",
    email: "email@email.com",
  },

};


export const findAll = async (): Promise<User[]> => Object.values(users);

export const find = async (id: number): Promise<User> => users[id];

export const create = async (newUser: BaseUser): Promise<User> => {
  const id = new Date().valueOf();

  users[id] = {
    id,
    ...newUser,
  };

  return users[id];
};

export const update = async (
  id: number,
  userUpdate: BaseUser
): Promise<User | null>users => {
  const user = await find(id);

  if (!user) {
    return null;
  }

  users[id] = { id, ...userUpdate };

  return users[id];
};

export const remove = async (id: number): Promise<null | void> => {
  const chore = await find(id);

  if (!chore) {
    return null;
  }

  delete users[id];
};
