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
    handler:  function handler() {
                    var condition = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "false"
                      , then = arguments.length > 1 ? arguments[1] : void 0
                      , els = arguments.length > 2 ? arguments[2] : void 0;
                    try {
                        var evaluated = eval(condition);
                        return evaluated ? then || (smartBlocksContext.ifCommand = !0,
                        "") : els || (smartBlocksContext.ifCommand = !1,
                        "")
                    } catch (e) {
                        return "Failed to evaluate IF condition: ".concat(e.message)
                    }
                
    }
  });
  regCommand({text: "THEN",
    delayArgs: true,
    help: "Used with IF when IF is true\n\n1: Text to be inserted",
    handler:  function() {
                    if (smartBlocksContext.ifCommand) {
                        smartBlocksContext.ifCommand = void 0;
                        for (var e = arguments.length, t = new Array(e), u = 0; u < e; u++)
                            t[u] = arguments[u];
                        return proccessBlockText(t.join(","))
                    }
                    return ""
    },
  });
  regCommand({
    text: "ELSE",
    help: "Used with IF when IF is false\n\n1: Text to be inserted",
    handler: function() {
                    if (!1 === smartBlocksContext.ifCommand) {
                        smartBlocksContext.ifCommand = void 0;
                        for (var e = arguments.length, t = new Array(e), u = 0; u < e; u++)
                            t[u] = arguments[u];
                        return t.join(",")
                    }
                    return ""
    }
  });
  regCommand({
    text: "IFTRUE",
    help: "Test if parameter is true. If true, the block is output.\n\n1: Logic to be evaluated",
    handler: function handler(condition) {
                    try {
                        return eval(condition) || (smartBlocksContext.exitBlock = "yes"),
                        ""
                    } catch (e) {
                        return "Failed to evaluate IFTRUE condition: ".concat(e.message)
                    }
                }
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
