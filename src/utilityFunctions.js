export const fetchFileContent = (path) => {
  try {
    return Deno.readTextFileSync(path);
  } catch {
    throw `head: ${path}: no such file or directory`;
  }
};

// for multifiles
export const validResults = (argsInFormat, operations) => { //{command count [path]}
  const functionReferance = operations[argsInFormat.command];

  return argsInFormat.paths.map(path => {
    try {
      const fileContent = fetchFileContent(path);
      const contentHeading = argsInFormat.paths.length > 1 ?
        `==> ${path} <==\n` : "";

      return contentHeading + functionReferance(fileContent, argsInFormat.count);
    } catch (error) {
      return error;
    }
  }).join("\n");
};

export const formatArguments = (args, operations) => {
  if (!args[0].startsWith("-")) { // extract
    return { command: "-n", count: 10, paths: args };
  }

  if (args[0].slice(1) > 0) {
    return { command: "-n", count: args[0].slice(1), paths: args.slice(1) };
  }

  const argsInFormat = {
    command: args[0].slice(0, 2),
    count: args[1],
    paths: args.slice(2)
  };

  if (args[0].length > 2) {
    argsInFormat.count = args[0].slice(2);
    argsInFormat.paths = args.slice(1);
  }

  if (!(argsInFormat.command in operations)) {
    throw `head: invalid option -- ${args[0]}`;
  }

  if (!(argsInFormat.count > 0)) { //doesn't work for tail -ve
    throw `illegal line count -- ${argsInFormat.count}`;
  }

  return argsInFormat;
};