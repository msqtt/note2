import { web } from "./web";
import { arch } from "./arch";
export const app = {
  "/cs/app/": [...web, ...arch],
};
