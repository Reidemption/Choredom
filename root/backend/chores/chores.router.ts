import express, { Request, Response } from "express";
import * as ChoreService from "./chores.service";
import { BaseChore, Chore } from "./chore.interface";

export const choresRouter = express.Router();

choresRouter.get("/", async (req: Request, res: Response) => {
  try {
    const chores: Chore[] = await ChoreService.findAll();

    res.status(200).send(chores);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

choresRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const chore: Chore = await ChoreService.find(id);

    if (chore) {
      return res.status(200).send(chore);
    }

    res.status(404).send("chore not found");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

choresRouter.post("/", async (req: Request, res: Response) => {
  try {
    const item: BaseChore = req.body;

    const newChore = await ChoreService.create(item);

    res.status(201).json(newChore);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

choresRouter.put("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const itemUpdate: Chore = req.body;

    const existingChore: Chore = await ChoreService.find(id);

    if (existingChore) {
      const updatedChore = await ChoreService.update(id, itemUpdate);
      return res.status(200).json(updatedChore);
    }

    const newChore = await ChoreService.create(itemUpdate);

    res.status(201).json(newChore);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// DELETE items/:id

choresRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await ChoreService.remove(id);

    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
