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
var Command = function(n,a){
	if(!n){
		throw new SyntaxError("Name parameter required");
		return;
	}
	var enabled = true;
	var name = n;
	var args = a;
	this.callback = function(){};
	
	Command.instances.push(this);
	
	this.getName = function(){
		return name;
	};
	this.getArgs = function(){
		return args;
	};
	this.setArgs = function(a){
		args = a;
	};
	this.initialize = function(){
		this.enabled = true;
	};
	this.enable = function(){
		return true;
		this.enabled = true;
	}
	this.disable = function(){
		return true;
		this.enabled = false;
	};
	this.destroy = function () {
		if(this.enabled == true){
			throw new SyntaxError("Attempt to destroy a command before being disabled");
			return false;
		}else{
			var i = 0;
			while(Command.instances[i] !== this){i++;}
			Command.instances.splice(i, 1);
			return true;
		}
	};
	this.copy = function(i){
		return new Command(i.getName(),i.getArgs());
	}
	this.toString = function(){
		return "/"+this.getName()+" "+JSON.stringify(this.getArgs());
	};
};

Command.instances = [];

API.on(API.CHAT_COMMAND,function(e){
	var c = e.substring(1).split(" ")[0],a = e.substring(1).split(" ").slice(1);//Command Typed
	for(var i in Command.instances){
		if(c == Command.instances[i].getName()){
			console.log("User typed: /"+Command.instances[i].getName()+" "+JSON.stringify(a));
			if(Command.instances[i].getArgs().length == a.length){
				Command.instances[i].callback(a);
			}else{
				throw new SyntaxError("Invalid Usage of Command: "+Command.instances[i].getName());
				return Command.instances[i].toString();
			}
		}
	}
});