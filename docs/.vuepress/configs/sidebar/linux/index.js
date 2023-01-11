import { web } from "./web";
import { git } from "./git";
import { lua } from "./lua";

export const linux = {
  ...web,
  ...git,
  ...lua,
};
