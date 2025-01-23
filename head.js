import { head } from "./src/headFunctions.js";

export const main = () => {
  const args = Deno.args;

  try {
    const result = head(args);

    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

main();
