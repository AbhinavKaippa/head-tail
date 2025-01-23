import { beforeEach, afterEach, describe, test } from "jsr:@std/testing/bdd";
import { assertEquals, assertThrows } from "jsr:@std/assert";

import { fetchFileContent, validResults, formatArguments } from "../src/utilityFunctions.js";

const emptyFile = "";
const fiveLines = "1\n2\n3\n4\n5";
const tenLines = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";
const twentyLines = tenLines + "\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20";

const operations = {
  "-n": "extractFirstNLines",
  "-c": "extractFirstNBytes"
};

const fetchFile = (path) => {
  const files = {
    "data/emptyFile.txt": emptyFile,
    "data/fiveLines.txt": fiveLines,
    "data/tenLines.txt": tenLines,
    "data/twentyLines.txt": twentyLines,
  };

  if (path in files) {
    return files[path];
  }

  throw `head: ${path}: no such file or directory`;
};

const realReadTextFileSync = Deno.readTextFileSync;

describe("testing fetchFileContent", () => {
  beforeEach(() => Deno.readTextFileSync = fetchFile);
  afterEach(() => Deno.readTextFileSync = realReadTextFileSync);

  test("giving valid file path to fetchFileContent will give the file content", () => {
    const input = "data/fiveLines.txt";
    const expected = "1\n2\n3\n4\n5";

    assertEquals(fetchFileContent(input), expected);
  });

  test("giving invalid file path to fetchFileContent will give error", () => {
    const input = "data/fiveLines.tx";
    const expected = `head: ${input}: no such file or directory`;

    assertEquals(assertThrows(() => fetchFileContent(input)), expected);
  });
});

describe("testing formatArguments without valid commands", () => {
  test("passing only file name in formatArguments will give -n , 10 with the path", () => {
    const input = ["data/tenLines.txt"];
    const expected = { command: "-n", count: 10, paths: [input.at(-1)] };

    assertEquals(formatArguments(input), expected);
  });

  test("passing -5 and file name in formatArguments will give -n , 5 with the path", () => {
    const input = ["-5", "data/tenLines.txt"];
    const expected = { command: "-n", count: "5", paths: [input.at(-1)] };

    assertEquals(formatArguments(input), expected);
  });

  test("passing -5 and file name in formatArguments will give -n , 5 with the path", () => {
    const input = ["-5", "data/tenLines.txt"];
    const expected = { command: "-n", count: "5", paths: [input.at(-1)] };

    assertEquals(formatArguments(input), expected);
  });

  test("passing invalid command and file name in formatArguments will give error", () => {
    const input = ["-s", "10", "data/tenLines.txt"];
    const expected = `head: invalid option -- ${input[0]}`;

    assertEquals(assertThrows(() => formatArguments(input, operations)), expected);
  });
});

describe("testing formatArguments with -n", () => {
  test("passing -n10 and file name in formatArguments will give -n , 10 with the path", () => {
    const input = ["-n10", "data/tenLines.txt"];
    const expected = { command: "-n", count: "10", paths: [input.at(-1)] };

    assertEquals(formatArguments(input, operations), expected);
  });

  test("passing -n, 10 and file name in formatArguments will give -n , 10 with the path", () => {
    const input = ["-n", "10", "data/tenLines.txt"];
    const expected = { command: "-n", count: "10", paths: [input.at(-1)] };

    assertEquals(formatArguments(input, operations), expected);
  });

  test("passing -n, -10 and file name in formatArguments will give error", () => {
    const input = ["-n", "-10", "data/tenLines.txt"];
    const expected = `illegal line count -- ${input[1]}`;

    assertEquals(assertThrows(() => formatArguments(input, operations)), expected);
  });

  test("passing -n, illegal line count and file name in formatArguments will give error", () => {
    const input = ["-n", "ad", "data/tenLines.txt"];
    const expected = `illegal line count -- ${input[1]}`;

    assertEquals(assertThrows(() => formatArguments(input, operations)), expected);
  });

});