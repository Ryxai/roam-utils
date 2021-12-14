window.roamjs.extension.smartblocks.registerCommand({
   text: 'UPDATEPAGETITLE',
   help : "Updates the page title referenced by the first argument with the text in the rest.\n\n1. Page reference\n\n2. Text to update with",
   handler: () => (ref: string, ...rest: string[]) => {
      const text = rest.join(",");
      const uid = extractRef(ref);
      window.roamAlphaAPI.updatePage({page:{title: text, uid: uid}});
      return "";
   }
});
window.roamjs.extension.smartblocks.registerCommand(
{
        text: "SETEXTVAR",
        help: "Returns a variable from the smt-ext environment\n\n1. Variable name",
        handler: () => (name: string, val: any) => {
                window.sm_ext.vars[name] = val;
                return "";
        }
});
window.roamjs.extension.smartblocks.registerCommand({
        text: "GETEXTVAR",
        help: "Create a variable in memory in the smt-ext environment\n\n1. Variable name\n\n2: Value of variable",
        handler: () => (name: string) => {
                return window.sm_ext.vars[name];
        }
});
window.roamjs.extension.smartblocks.registerCommand({
  text: "CLEAREXTVAR",
  help: "Deletes a variable from the smt-ext environment\n\n1. Variable name",
  handler: () => (name : string) => {
    delete window.sm_ext[name]
    return "";
  }
});
window.roamjs.extension.smartblocks.registerCommand({
  text: "DELETEBLOCK",
  help: "Deletes a block\n\n1. Block uid",
  handler: () => (uid: string) => {
    window.roamAlphaAPI.deleteBlock({block: {uid: uid}});
    return "";
  }
});
