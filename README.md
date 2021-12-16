# roam-utils
Hosting for some roam utility scripts

[ext_min](https://ryxai.github.io/roam-utils/ext_min.js): A set of smartblock commands to extend the existing ones without having to reload the entire script.
The following commands are currently implemented:

***

   **NOTE THE FOLLOWING COMMANDS SHOULD BE USED SPARINGLY AS GLOBAL VARIABLES CAN COLLIDE ETC AND CAUSE ISSUES WITH YOUR GRAPH**
  **THESE VARIABLES WILL PERSIST FOR THE DURATION OF YOUR SESSION UNLESS YOU MANUALLY DELETE THEM OR REFRESH/CLOSE ROAM**
  **IF YOU NEED ACCESS TO THESE VARIABLES THROUGH JAVASCRIPT THEY CAN BE ACCESSED AT window.smt-ext.vars**
  
  * GETGLOBVAR:         Returns a global variable, will be returned as a string
                        Argument 1: The variable name

  * SETGLOBVAR:         Creates a global variable in memory
                        Argument 1: The variable name
                        Argument 2: The The value of the variable

  * CLEARGLOBVAR:       Deletes a global variable\
                        Argument 1: The variable name
  
  **NOTE THE FOLLOWING COMMANDS ARE IRREVERSIBLE AND CAUSE DATA LOSS IF USED, TEST YOUR USAGE THOROUGHLY BEFORE IMPLEMENTING THEM**
  **ON MEANINGFUL DATA. THEY ARE USED AT YOUR OWN RISK**

  * DELETEBLOCK:        Deletes a block
                        Argument 1: The uid of the block

  * DELETEPAGE:         Deletes a page
                        Argument 1: The uid of the page

  **THE FOLLOWING COMMANDS ARE FOR MANIPULATING/RETRIEVING PAGE DATA**

  * UPDATEPAGETITLE:    Updates the page title referenced by the first argument with the text in the rest.
                        Argument 1: The uid of the pagetitle
                        Argument 2: The text the pagetitle will be updated to

  * GETPAGEUIDOFBLOCK:  Returns the uid of the page the specified block belongs to
                        Argument 1: The block uid

  * GETPAGETITLEOFBLOCK:Returns ther title of the page a block belongs to
                        Argument 1: The block uid

  * EXTRACTREF:         Removes the reference parentheses from a block reference
                        Argument 1: The block reference
                        
  **THE FOLLOWING COMMANDS ARE USED TO CREATE ELEMENTS IN A PAGE**
  **THE WAY BLOCK ORDER IS USED IS THAT EACH BLOCK IN ORDER IS DISPLAYED AS CHILDREN STARTING WITH 0**
  **TO APPEAR AT THE TOP OF THE CHILDREN USE 0 FOR THE BLOCK ORDER**
  
  * CREATEBLOCK:        Creates a block under the provided parent block (can be a page)
                        Argument 1: Parent block reference
                        Argument 2: Block order
                        Argument 3: The contents to be placed in the block

