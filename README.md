# roam-utils
Hosting for some roam utility scripts

[ext_min](https://ryxai.github.io/roam-utils/ext_min.js): A set of smartblock commands to extend the core ones without having to modify the original script.
The following commands are currently implemented:

[ext_deprecated_sb](https://ryxai.github.io/roam-utils/ext_deprecated_sb.js): A set of deprecated commands from smartblocks. Note that this is NOT intended as a fix for long term use. Please migrate as requested, leaving your graph open to attack is definitely a bad idea. This will remain up for the forseeable future but do not rely on its long-term presence. 

***

   **NOTE** The following commands should be used sparingly as global variables can collide etc and cause issues with your graph is recklessly utilized. The variables and their contents will persist for the duration of the session within the window. They will be purged if you close or refesh Roam. The variables can be programmatically accessed by `window.smt-ext.vars`. 
  
  * GETGLOBVAR:         Returns a global variable, will be returned as a string
                        
        Argument 1: The variable name

  * SETGLOBVAR:         Creates a global variable in memory
                        
        Argument 1: The variable name
        Argument 2: The The value of the variable

  * CLEARGLOBVAR:       Deletes a global variable
                        
        Argument 1: The variable name
  
  **NOTE** THhe following commands when used cause irreversible data loss. Before using a smartblock containing them on your information please test the block you are using/writing thoroughly (preferably on another graph). They are used **AT YOUR OWN RISK**. 

  * DELETEBLOCK:        Deletes a block
                        
        Argument 1: The uid of the block

  * DELETEPAGE:         Deletes a page
                        
        Argument 1: The uid of the page

 THe following commands are for manipulating retrieveing page data.

  * UPDATEPAGETITLE:    Updates the page title referenced by the first argument with the text in the rest.
                        
        Argument 1: The uid of the pagetitle
        Argument 2: The text the pagetitle will be updated to

  * GETPAGEUIDOFBLOCK:  Returns the uid of the page the specified block belongs to
                        
        Argument 1: The block uid

  * GETPAGETITLEOFBLOCK:Returns ther title of the page a block belongs to
                        
        Argument 1: The block uid

  * EXTRACTREF:         Removes the reference parentheses from a block reference
                        
        Argument 1: The block reference
                        
  The following commands are used to create elements in a page. Blocks are indexed from 0, meaning that the first block at the top of the list would be index 0. 
  
  * CREATEBLOCK:        Creates a block under the provided parent block (can be a page)
 
        Argument 1: Parent block reference
        Argument 2: Block order
        Argument 3: The contents to be placed in the block
