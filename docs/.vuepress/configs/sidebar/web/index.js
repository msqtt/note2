import { html } from "./html";
import { css } from "./css";
import { js } from "./js";
import { go } from "./go";
import { java } from "./java";
import { mysql } from "./mysql";
import { mariadb } from "./mariadb";
import { mongodb } from "./mongodb";
import { redis } from "./redis";

export const web = {
  ...html,
  ...css,
  ...js,
  ...go,
  ...java,
  ...mysql,
  ...mariadb,
  ...mongodb,
  ...redis,
};
