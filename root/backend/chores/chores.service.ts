/**
 * Data Model Interfaces
 */

import { BaseChore, Chore } from "./chore.interface";
import { Chores } from "./chores.interface";

/**
 * In-Memory Store
 */

let chores: Chores = {
  /*
name: string
due_date: st
description:
repeated: bo
frequency: s
room_area: s
  */
  1: {
    id: 1,
    name: "Do the laundry",
    due_date: "03-03-2023",
    description: "Make sure to separate the whites and colors",
    repeated: true,
    frequency: "weekly",
    room_area: "laundry room",
    completed: false,
  },
  2: {
    id: 2,
    name: "Do the dishes",
    due_date: "03-03-2023",
    description: "Don't leave the dishes in the sink to soak.",
    repeated: true,
    frequency: "daily",
    room_area: "laundry room",
    completed: false,
  },
  3: {
    id: 3,
    name: "Do homework",
    due_date: "03-03-2023",
    description: "Replace the trash bag with a scented one.",
    repeated: false,
    frequency: null,
    room_area: "laundry room",
    completed: false,
  },
};

/**
 * Service Methods
 */

export const findAll = async (): Promise<Chore[]> => Object.values(chores);

export const find = async (id: number): Promise<Chore> => chores[id];

export const create = async (newChore: BaseChore): Promise<Chore> => {
  const id = new Date().valueOf();

  chores[id] = {
    id,
    ...newChore,
  };

  return chores[id];
};

export const update = async (
  id: number,
  choreUpdate: BaseChore
): Promise<Chore | null> => {
  const chore = await find(id);

  if (!chore) {
    return null;
  }

  chores[id] = { id, ...choreUpdate };

  return chores[id];
};

export const remove = async (id: number): Promise<null | void> => {
  const chore = await find(id);

  if (!chore) {
    return null;
  }

  delete chores[id];
};
