const Discord = require('discord.js')
const { prefix, token } = require("./config.json")
const client = new Discord.Client()

client.once("ready", () =>{
    console.log("Ready!")
})

//id b2c
//690644343199105055
client.on('message', msg => {
    //Get incoming messages that starts with the command `!${variable}` 
    if(msg.content.startsWith(`${prefix}daily`)){
        channel = msg.guild.channels.cache.get('705048519823720492')
        let membersOnline = []
        for( const [id,member] of channel.members){
            console.log(member.user.username)
            membersOnline.push(member.user.username)
        }
        // msg.reply(`Usuarios online no canal general ${membersOnline}`)
        sortRandomly(membersOnline).map((member,i) => {
            msg.channel.send(`${++i} - ${member}`)
        })
        msg.channel.send('Lista sorteada !').then(sentMessage => {
            sentMessage.react('🦩');
        });
    }
});

function sortRandomly(array){
    for (let i = 0; i < array.length; i++) {
        let random = Math.floor(Math.random() * array.length)
        let element = array[i]
        array[i] = array[random]
        array[random] = element
    }
    return array
}
function sortRandomlyUsingMap(array){
    let arrayCopy = [...array]
    return arrayCopy.map((value)=>{
        let random = Math.floor(Math.random() * arrayCopy.length)
        let element = value
        value = arrayCopy[random]
        arrayCopy[random] = element
    })
}
client.login(token);