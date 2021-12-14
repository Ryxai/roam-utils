regCommand = (e) => {
  const text = e.text.toUpperCase();
  const help = e.help;
  const handler = e.handler;
  const register = (retry) =>
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
  register(0);
};
window.sm_ext = {};
window.sm_ext.vars = {};
regCommand({
   text: 'UPDATEPAGETITLE',
   help : "Updates the page title referenced by the first argument with the text in the rest.\n\n1. Page reference\n\n2. Text to update with",
   handler: () => (ref, ...rest) => {
      const text = rest.join(",");
      window.roamAlphaAPI.updatePage({page:{title: text, uid: uid}});
      return "";
   }
});
regCommand(
{
        text: "SETGLOBVAR",
        help: "Returns a global variable from the smt-ext environment\n\n1. Variable name",
        handler: () => (name, val) => {
                window.sm_ext.vars[name] = val;
                return "";
        }
});
regCommand({
        text: "GETGLOBVAR",
        help: "Create a variable in global memory in the smt-ext environment\n\n1. Variable name\n\n2: Value of variable",
        handler: () => (name) => {
          return typeof window.sm_ext.vars[name] === "undefined"
            ? `--> Variable ${name} not SET <--`
            : window.sm_ext.vars[name];
        }
});
regCommand({
  text: "CLEAREXTVAR",
  help: "Deletes a global variable from the smt-ext environment\n\n1. Variable name",
  handler: () => (name) => {
    delete window.sm_ext[name]
    return "";
  }
});
regCommand({
  text: "DELETEBLOCK",
  help: "Deletes a block\n\n1. Block uid",
  handler: () => (uid) => {
    window.roamAlphaAPI.deleteBlock({block: {uid: uid}});
    return "";
  }
});
