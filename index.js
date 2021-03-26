const {Collection, Client, Discord} = require('discord.js')


const fs = require('fs')
const client = new Client({
    disableEveryone: true
})
const config = require('./config.json')
const { connected } = require('process')
const prefix = config.prefix
const token = config.token
client.commands = new Collection();
client.aliases = new Collection();



client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 
client.on('ready', () => {
    client.user.setActivity(`${prefix}help`)
    console.log(`${client.user.username} ✅`)
})
client.on('message', async message =>{
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) command.run(client, message, args) 
})

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://mydb:AsEKfyFYYwKB8bI0@cluster0.n19fg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});










client.login(process.env.BOT_TOKEN)
