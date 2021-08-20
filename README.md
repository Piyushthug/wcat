Run different "cat" command using "wcat -[flag] [fileName] [option] [option]........"
flag : {
         rs :"remove space",
         rn: "remove line", 
         s: "serialize content", 
         sn: "serialize content by remove empty line",
         rsc: "remove special charater" eg- wcat -rsc [fileName] "$@",
         rxn: "remove extra line",
         cc: "create copy",
         ap: "append"
         }
