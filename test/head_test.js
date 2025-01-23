import { beforeEach, afterEach, describe, test } from "jsr:@std/testing/bdd";
import { assertEquals, assertThrows } from "jsr:@std/assert";

import { head, extractFirstNLines, extractFirstNBytes } from "../src/headFunctions.js";

const emptyFile = "";
const fiveLines = "1\n2\n3\n4\n5";
const tenLines = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";
const twentyLines = tenLines + "\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20";

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

describe("extractFirstNLines will give N lines of the input from the first", () => {
  test("giving file with 5 lines will give entire 5 lines", () => {
    const input = fiveLines;
    const expected = "1\n2\n3\n4\n5";

    assertEquals(extractFirstNLines(input, 10), expected);
  });

  test("giving file with  10 lines will give entire 10 lines", () => {
    const input = tenLines;
    const expected = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";

    assertEquals(extractFirstNLines(input, 10), expected);
  });

  test("giving file with 20 lines will give exactly 10 lines", () => {
    const input = twentyLines;
    const expected = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";

    assertEquals(extractFirstNLines(input, 10), expected);
  });

  test("giving empty string will give emptystring back", () => {
    const input = emptyFile;
    const expected = "";

    assertEquals(extractFirstNLines(input, 10), expected);
  });

});

describe("head without any command will give first 10 lines of the input or an error", () => {
  beforeEach(() => Deno.readTextFileSync = fetchFile);
  afterEach(() => Deno.readTextFileSync = realReadTextFileSync);

  test("giving file with 5 lines will give entire 5 lines", () => {
    const expected = "1\n2\n3\n4\n5";

    assertEquals(head(["data/fiveLines.txt"]), expected);
  });

  test("giving file with  10 lines will give entire 10 lines", () => {
    const expected = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";

    assertEquals(head(["data/tenLines.txt"]), expected);
  });

  test("giving file with 20 lines will give first 10 lines", () => {
    const expected = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";

    assertEquals(head(["data/twentyLines.txt"]), expected);
  });

  test("giving invallid path will give error message", () => {
    const expected = "head: data/tenLines.tx: no such file or directory";

    assertEquals(assertThrows(() => head(["data/tenLines.tx"])), expected);
  });

});

describe("head with command -n will give first N lines of the input", () => {
  beforeEach(() => Deno.readTextFileSync = fetchFile);
  afterEach(() => Deno.readTextFileSync = realReadTextFileSync);

  test("giving file with 5 lines and n as 10 will give entire 5 lines", () => {
    const expected = "1\n2\n3\n4\n5";

    assertEquals(head(["-n", "10", "data/fiveLines.txt"]), expected);
  });

  test("giving file with 10 lines and n as 10 will give entire 10 lines", () => {
    const expected = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";

    assertEquals(head(["-n", "10", "data/tenLines.txt"]), expected);
  });

  test("giving file with 20 lines and n as 10 will give first 10 lines", () => {
    const expected = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";

    assertEquals(head(["-n", "10", "data/twentyLines.txt"]), expected);
  });

  test("giving file with 20 lines and n as -n10 will give first 10 lines", () => {
    const expected = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";

    assertEquals(head(["-n", "10", "data/twentyLines.txt"]), expected);
  });

  test("giving file with 10 lines and n as -5 will give first five lines", () => { //------
    const expected = "1\n2\n3\n4\n5";

    assertEquals(head(["-5", "data/tenLines.txt"]), expected);
  });

});

describe("head with command -n and other parameters as invalid", () => {
  beforeEach(() => Deno.readTextFileSync = fetchFile);
  afterEach(() => Deno.readTextFileSync = realReadTextFileSync);

  test("giving invallid path with -n, 10 will give error message", () => {
    const expected = "head: data/tenLines.tx: no such file or directory";

    assertEquals(assertThrows(() => head(["-n", "10", "data/tenLines.tx"])), expected);
  });

  test("giving file with 10 lines and -n only will give error", () => {
    const expected = "illegal line count -- data/tenLines.txt";

    assertEquals(assertThrows(() => head(["-n", "data/tenLines.txt"])), expected);
  });

  test("giving file with 10 lines and -n5k will give error", () => {
    const expected = "illegal line count -- 5k";

    assertEquals(assertThrows(() => head(["-n5k", "data/tenLines.txt"])), expected);
  });

  test("giving file with 10 lines and -n, 5k will give error", () => {
    const expected = "illegal line count -- 5k";

    assertEquals(assertThrows(() => head(["-n", "5k", "data/tenLines.txt"])), expected);
  });

  // test("giving file with 10 lines and n as 5 will give error", () => {
  //   const expected = "head: 5: no such file or directory\n==> data/tenLines.txt <==\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10";

  //   assertEquals(head(["5", "data/tenLines.txt"]), expected);
  // });

  // test("giving no file and comand n  will give error", () => {
  //   const expected = "";

  //   assertEquals(head(["-n", "5"]), expected);
  // });

});

describe("extractFirstNBytes will give N bytes of the input including \\n from the first", () => {
  test("giving tenLines and count as 5 will give 3 lines", () => {
    const input = fiveLines;
    const expected = "1\n2\n3";

    assertEquals(extractFirstNBytes(input, 5), expected);
  });

  test("giving tenLines and count as 20 will give entire 5 line file", () => {
    const input = fiveLines;
    const expected = "1\n2\n3\n4\n5";

    assertEquals(extractFirstNBytes(input, 20), expected);
  });

  test("giving empty string and count as 10 will give emptystring back", () => {
    const input = emptyFile;
    const expected = "";

    assertEquals(extractFirstNBytes(input, 10), expected);
  });
});

