export const getLast10Lines = data => data.split("\n").slice(-10).join("\n");

export const tail = (path) => {
  try {
    const fileData = Deno.readTextFileSync(path);

    return getLast10Lines(fileData);
  } catch {
    return `tail: ${path}: no such file or directory`;
  }
};