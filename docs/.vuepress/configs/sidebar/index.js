import { algorithm } from "./algorithm";
import { cs } from "./cs";
import { web } from "./web";
import { linux } from "./linux";

export const sidebar = {
  ...algorithm,
  ...web,
  ...linux,
  ...cs,
};
