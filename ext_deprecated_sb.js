regCommand = (e) => {
  const text = e.text.toUpperCase();
  const help = e.help;
  const handler = e.handler;
  const register = (retry) => {
    window.roamjs?.extension?.smartblocks?.unregisterCommand(text);
    window.roamjs?.extension?.smartblocks?.registerCommand
      ? window.roamjs.extension.smartblocks.registerCommand({
          text,
          help,
          handler
        })
      : retry === 120 && window.roamjs
      ? !(window.roamjs = {
          ...window.roamjs,
          extension: {
            ...window.roamjs.extension,
            [text]: {
              ...window.roamjs.extension[text],
              registerSmartBlocksCommand: () => {
                window.roamjs?.extension.smartblocks.registerCommand({
                  text,
                  handler,
                });
              },
            },
          },
        })
      : window.setTimeout(() => register(retry + 1), 1000);
  }
  register(0);
};
regCommand( {
    text: "IF",
    help: "DEPRECATED",
    handler: (condition = "false", then, els) => {
      try {
        const evaluated = eval(condition);
        if (evaluated) {
          if (then) {
            return then;
          } else {
            smartBlocksContext.ifCommand = true;
            return "";
          }
        } else {
          if (els) {
            return els;
          } else {
            smartBlocksContext.ifCommand = false;
            return "";
          }
        }
      } catch (e) {
        return `Failed to evaluate IF condition: ${e.message}`;
      }
    },
  });
  regCommand({text: "THEN",
    delayArgs: true,
    help: "Used with IF when IF is true\n\n1: Text to be inserted",
    handler: (...args: string[]) => {
      if (smartBlocksContext.ifCommand) {
        smartBlocksContext.ifCommand = undefined;
        return proccessBlockText(args.join(","));
      }
      return "";
    },
  });
  regCommand({
    text: "ELSE",
    help: "Used with IF when IF is false\n\n1: Text to be inserted",
    handler: (...args: string[]) => {
      if (smartBlocksContext.ifCommand === false) {
        smartBlocksContext.ifCommand = undefined;
        return args.join(",");
      }
      return "";
    },
  });
  regCommand({
    text: "IFTRUE",
    help: "Test if parameter is true. If true, the block is output.\n\n1: Logic to be evaluated",
    handler: (condition) => {
      try {
        if (!eval(condition)) {
          smartBlocksContext.exitBlock = "yes";
        }
        return "";
      } catch (e) {
        return `Failed to evaluate IFTRUE condition: ${e.message}`;
      }
    },
  });
  regCommand({
    text: "JA",
    help: "DEPRECATED",
    handler: javascriptHandler(AsyncFunction)
  });
  regCommand({
    text: "JAVASCRIPTASYNC",
    help: "DEPRECATED",
    handler: javascriptHandler(AsyncFunction),
  });
  regCommand({
    text: "J",
    help: "DEPRECATED",
    handler: javascriptHandler(Function),
  });
  regCommand({
      text: "JAVASCRIPT",
    help: "DEPRECATED",
    handler: javascriptHandler(Function)
  });
