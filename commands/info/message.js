const { Message } = require("discord.js");

module.exports={
    name: "message",
    aliases: "msg",
    run: async(client , Message) =>{
        Message.channel.send("Hi there!")
    }
}