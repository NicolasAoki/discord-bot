const Discord = require('discord.js')
// const { prefix, token } = require("./config.json")
const client = new Discord.Client()

client.once("ready", () =>{
    console.log("Ready!")
})

client.on('message', msg => {
    if(msg.content.startsWith(`${process.env.prefix}daily`)){        
        const args = msg.content.split(/ +/)
        args.shift()
        let voiceChannelId = 0
        let voiceChannelArray = []
        let errorMsg
    
        if(!args) {
            channelId = msg.channel.id
            channel = msg.guild.channels.cache.get(channelId)
        }
        else{
            msg.guild.channels.cache.map(voiceChannel => {
                
                if(voiceChannel.type === 'voice'){
                    voiceChannelArray.push(voiceChannel.name)

                    if(voiceChannel.name.toLowerCase() == args[0]){
                        voiceChannelId = voiceChannel.id
                    }
                }
            })
            if(voiceChannelId === 0) {
                errorMsg = voiceChannelArray
            }
        }

        channel = msg.guild.channels.cache.get(voiceChannelId)

        if(errorMsg){
            return msg.channel.send(`Por favor insira um destes canais: \n${errorMsg}`)
        }


        let membersOnline = []
        for( const [id,member] of channel.members){
            membersOnline.push(member.user.username)
        }

        if(!membersOnline.length){
            msg.channel.send(`Nenhum flamingo neste canal`).then(sentMessage => {
                sentMessage.react('😕');
            })
        }
        else{
            sortRandomly(membersOnline).map((member,i) => {
                msg.channel.send(`${++i} - ${member}`)
            })
            msg.channel.send('Lista sorteada !').then(sentMessage => {
                sentMessage.react('🦩');
            });
        }     
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
client.login(process.env.token);