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
   handler: () => (uid, ...rest) => {
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
  text: "CLEARGLOBVAR",
  help: "Deletes a global variable from the smt-ext environment\n\n1. Variable name",
  handler: () => (name) => {
    delete window.sm_ext.vars[name]
    return "";
  }
});
regCommand({
  text: "DELETEBLOCK",
  help: "Deletes a block\n\n**WARNING: THIS IS IRREVERSIBLE BE CAREFUL BEFORE USING IT AND TEST THOUROUGHLY USE AT YOUR OWN RISK**\n\n1. Block uid",
  handler: () => (uid) => {
    window.roamAlphaAPI.deleteBlock({block: {uid: uid}});
    return "";
  }
  });
  regCommand({
  text: "DELETEPAGE",
  help: "Deletes a page\n\n**WARNING: THIS IS IRREVERSIBLE BE CAREFUL BEFORE USING IT AND TEST THOUROUGHLY USE AT YOUR OWN RISK**\n\n1. Page uid",
  handler: () => (uid) => {
    window.roamAlphaAPI.deletePage({page: {uid: uid}});
    return "";
  }
});
  regCommand({
  text: "GETPAGEUIDOFBLOCK",
  help: "Returns the uid of the page the block belongs to\n\n1. Block uid",
  handler: () => (uid) => {
    return window.roamAlphaAPI.q('[:find ?puid :in $ ?uid :where [?b :block/uid ?uid][?b :block/page ?p][?p :block/uid ?puid]]',uid).join("");
  }
    });
  regCommand({
  text: "GETPAGETITLEOFBLOCK",
  help: "Returns the title of the page the block belongs to\n\n1. Block uid",
  handler: () => (uid) => {
    return window.roamAlphaAPI.q('[:find ?title :in $ ?uid :where [?b :block/uid ?uid][?b :block/page ?p][?p :node/title ?title]]',uid).join("");
  } 
});
  regCommand({
  text: "EXTRACTREF",
  help: "Removes the reference parenthases from a blockuid\n\n1. Block reference",
  handler: () => (uid) => {
    return uid.replace(/[\(\)]/g,"");
  } 
});
