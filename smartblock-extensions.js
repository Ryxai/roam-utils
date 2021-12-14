window.roamjs.extension.smartblocks.registerCommand({
   text: 'UPDATEPAGE',
   help: "Updates the page title referenced by the first argument with the text in the rest.\n\n1. Page reference\n\n2. Text to update with",
  handler: (ref = "", ...rest) => {
      const text = rest.join(",");
      window.roamAlphaAPI.updatePage({"page":{"uid": uid,"string": text}});
      return "";
  }
});
