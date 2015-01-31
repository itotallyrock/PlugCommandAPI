/* //HANDLER
API.on(API.CHAT_COMMAND,function(e){
				var c = e.substring(1).split(" ")[0],args = e.substring(1).split(" ").slice(1),o,i;
				pluggedIn.core.info("User typed command /"+c+" ["+args.toString()+"]");
				for(i in pluggedIn.commands){
					if(c === i){
						$("#chat-input-field").val("");
						pluggedIn.commands[i].callback(args);
					}else{
						for(o = 0; o<pluggedIn.commands[i].alias.length; o++){
							if(c === pluggedIn.commands[i].alias[o]){
								pluggedIn.commands[i].callback(args);
							}else{
								pluggedIn.core.warn("No command or alias matched "+c,true);
							}
						}
					}
				}
			});
*/

var callback;

function Command(name,args){
	this.enabled = false;
	this.name = name;
	this.getName(){
		return this.name;
	};
	this.getArgs(){
		return this.args;
	};
	this.setArgs(args){
		this.args = args;
	}
	this.initialize(){
		this.enabled = true;
	};
	this.disable(){
		this.enabled = false;
	}
}
