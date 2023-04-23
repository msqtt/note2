import { db } from "./db";
import { app } from "./app";

export const cs = {
  ...db,
  ...app,
};
