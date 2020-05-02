const Discord = require('discord.js')
const { prefix, token } = require("./config.json")
const client = new Discord.Client()
client.once("ready", () =>{
    console.log("Ready!")
})

// client.on('ready', () => {
//   console.log(`Logged in as ${client.user.tag}!`);
// });

//id b2c
//690644343199105055
client.on('message', msg => {
    if(msg.content.startsWith(`${prefix}daily`)){
        channel = msg.guild.channels.cache.get('705048519823720492')
        let membersOnline = []
        for( const [id,member] of channel.members){
            console.log(member.user.username)
            membersOnline.push(member.user.username)
        }
        msg.reply(`Usuarios online no canal general ${membersOnline}`)

    }

});

client.login(token);