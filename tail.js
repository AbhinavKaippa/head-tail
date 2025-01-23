// implement this
import { tail } from "./src/tailFunctions.js";

export const main = () => {
  const path = Deno.args[0];

  console.log(tail(path));
};

main();