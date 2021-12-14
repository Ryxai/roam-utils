window.roamjs.extension.smartblocks.registerCommand({
   text: 'UPDATEPAGE',
   help: "Updates the page title referenced by the first argument with the text in the rest.\n\n1. Page reference\n\n2. Text to update with",
  handler: (ref = "", ...rest) => {
      const normRef = smartBlocksContext.variables[ref] || ref;
      const text = rest.join(",");
      const normOut = smartBlocksContext.variables[text] || text;
      const uid = extractRef(normRef);
      window.roamAlphaAPI.updatePage({"page":{"uid": uid,"string": normOut}});
      return "";
  }
});
