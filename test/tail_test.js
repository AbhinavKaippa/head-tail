import { describe, test } from "jsr:@std/testing/bdd";
import { assertEquals } from "jsr:@std/assert";

// import { main } from "../tail.js";
import { tail, getLast10Lines } from "../src/tailFunctions.js";

const dataFile = Deno.readTextFileSync("data/file.txt");
const emptyFile = Deno.readTextFileSync("data/emptyFile.txt");
const fiveLines = Deno.readTextFileSync("data/fiveLines.txt");
const tenLines = Deno.readTextFileSync("data/tenLines.txt");
const twentyLines = Deno.readTextFileSync("data/twentyLines.txt");

describe("getLast10Lines will give last 10 lines of the input", () => {
  test("giving file with 5 lines will give entire 5 lines", () => {
    const input = fiveLines;
    const expected = "1\n2\n3\n4\n5";

    assertEquals(getLast10Lines(input), expected);
  });

  test("giving file with  10 lines will give entire 10 lines", () => {
    const input = tenLines;
    const expected = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";

    assertEquals(getLast10Lines(input), expected);
  });

  test("giving file with 20 lines will give last 10 lines", () => {
    const input = twentyLines;
    const expected = "11\n12\n13\n14\n15\n16\n17\n18\n19\n20";

    assertEquals(getLast10Lines(input), expected);
  });

  test("giving empty string will give emptystring back", () => {
    const input = emptyFile;
    const expected = "";

    assertEquals(getLast10Lines(input), expected);
  });

});

describe("tail will give last 10 lines of the input", () => {
  const realReadText = Deno.readTextFileSync;

  test("giving file with 5 lines will give entire 5 lines", () => {
    Deno.readTextFileSync = () => fiveLines;

    const expected = "1\n2\n3\n4\n5";

    assertEquals(tail("data/fiveLines.txt"), expected);
  });

  test("giving file with  10 lines will give entire 10 lines", () => {
    Deno.readTextFileSync = () => tenLines;

    const expected = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";

    assertEquals(tail("data/tenLines.txt"), expected);
  });

  test("giving file with 20 lines will give last 10 lines", () => {
    Deno.readTextFileSync = () => twentyLines;

    const expected = "11\n12\n13\n14\n15\n16\n17\n18\n19\n20";

    assertEquals(tail("data/twentyLines.txt"), expected);
  });

  test("giving invallid path will give error message", () => {
    Deno.readTextFileSync = () => tenLine;

    const expected = "tail: data/ten Lines.tx: no such file or directory";

    assertEquals(tail("data/ten Lines.tx"), expected);
  });

  Deno.readTextFileSync = realReadText;
});


