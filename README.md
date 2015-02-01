# PlugCommandAPI
A plug.dj command API for plug.dj javascript developers.
##Usage

#####Simple Usage
<pre>
<code>
new Command(Name,[args]).callback = function(returnedArgs){/*Do something with args*/}

</pre>
</code>

#####Complex Usage
<pre>
<code>
var myCommand = new Command(Name,Args);
</code>
</pre>

Name is how the command is referenced


Name is what will be typed in the chat so /name



Args is an array like ["require","args","go","here"]


For single or no arg commands leave the parameter empty or use a []

<pre>
<code>
myCommand.callback = function(returnedArgs){/*Do something with args*/}
</code>
</pre>


Callback is called when your command is typed correctly with matching args

##Important Notes
Handling
* A `ReferenceError` will be thrown if an unknown command is typed.
* A `TypeError` will be thrown if the user types a command but has invalid args.

_Important to make notice of usage of `try` and `catch` as you can use this for handling_

##Other Info
#####Methods
`getName()` returns the name of the Command

`getArgs()` return the array of args for the Command

`setArgs([])` allows overriding of args

`enable()` enables the command

`disable()` disables the command

`getStatus()` return if the command is disabled or enabled

`destroy()` removes the command from the instances list

`copy("name",Command)` returns a new instance of the Command class with the same values as the parameter with identical callback

`toString()` the string version of the command */name [args,here]*

######Variables

`Command.instances` is list of all instances of the Command class **Modifying this will break execution**
