import { formatArguments, fetchFileContent } from "./utilityFunctions.js";

export const extractFirstNLines = (data, lines) =>
  data.split("\n").slice(0, lines).join("\n");

export const extractFirstNBytes = (data, charNo) =>
  data.split("").slice(0, charNo).join(""); //just slice

export const head = (args) => {
  const operations = {
    "-n": extractFirstNLines,
    "-c": extractFirstNBytes
  };

  const argsInFormat = formatArguments(args, operations); // returns {command, count, path}
  const fileContent = fetchFileContent(argsInFormat.paths[0]); //  destrt
  const functionReferance = operations[argsInFormat.command];

  return functionReferance(fileContent, argsInFormat.count);
};

// console.log(head(["5", "data/tenLines.txt"]));

// {
//   error:"key for errors",
//   path,
//   count,
// }

// throw {
//   error: "key for errors",
//   path,
//   count,
// };