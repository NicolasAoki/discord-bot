const Discord = require('discord.js')
const { prefix, token } = require("./config.json")
const client = new Discord.Client()

client.once("ready", () =>{
    console.log("Ready!")
})

//id b2c
//690644343199105055

//705936009405267982
client.on('message', msg => {
    //Get incoming messages that starts with the command `!${variable}` 
    if(msg.content.startsWith(`${prefix}daily`)){
        
        // 705048519823720492
        // console.log(msg.guild.channels.cache.map(e => console.log(e)))

        channel = msg.guild.channels.cache.get('705048519823720492')

        // channelId = msg.channel.id
        // channel = msg.guild.channels.cache.get(channelId)


        let membersOnline = []
        for( const [id,member] of channel.members){
            membersOnline.push(member.user.username)
        }

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