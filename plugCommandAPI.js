//var CommandEvent = new Event("CommandEvent")
var Command = function(n,a){
	if(!n){
		throw new SyntaxError("Name parameter required");
		return;
	}
	var status = true;
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
		this.args = a;
	};
	this.enable = function(){
		return true;
		this.status = true;
	}
	this.disable = function(){
		return true;
		this.status = false;
	};
	this.getStatus = function(){
		return status;
	}
	this.destroy = function () {
		if(this.status == true){
			throw new SyntaxError("Attempt to destroy a command before being disabled");
			return false;
		}else{
			var i = 0;
			while(Command.instances[i] !== this){i++;}
			Command.instances.splice(i, 1);
			return true;
		}
	};
	this.copy = function(n,i){
		return new Command(n,i.getArgs().callback = i.callback);
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
			if(Command.instances[i].getStatus()){
				console.log("User typed: /"+Command.instances[i].getName()+" "+JSON.stringify(a));
				if(Command.instances[i].getArgs().length == a.length){
					return Command.instances[i].callback(a);
				}else{
					throw new TypeError("Invalid Usage of Command: "+Command.instances[i].getName());
					return Command.instances[i].toString();
				}
			}else{
				return false;
			}
		}
	}
	throw new ReferenceError("Unknown command: "+c)
});