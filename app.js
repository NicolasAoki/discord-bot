const Discord = require('discord.js')
const { prefix, token } = require("./config.json")
const client = new Discord.Client()
const emojis = ['🥺','❤️','😂','🥰','🔥','😊','😍','🔫','⚡','🏆','🎺','🙈','🙉',
'🙊','💥','💫','💦','🐵','🦄','🐔','🐸','🐊','🦖','🦩','🌈','🛒','💣','🔪','📀',
'🕯️','💰','💸','💳','🔓','🖤','✊🏽','✊🏾','✊🏿','☮️','⚔️','🗡️','⛏️','🛡️','🧬','🧲']
const christmansEmojis = ['🎄','🎁','⛪','🎁','🌨️','🎁','🎁','🦌','🎁','🌲','🎅','🧤','🎄','🎄','🎁','❄️','🤶','❄️','☃️','⛄','🦢','🦃','🎁']
const generateRandomEmoji = () => {
    return christmansEmojis[Math.floor(Math.random() * christmansEmojis.length)]
}
client.once("ready", () =>{
    console.log("Ready!")
})

client.on('message', msg => {
    if(msg.content.startsWith(`${prefix}daily`)){        
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
            let listOfMembers = ''
            sortRandomly(membersOnline).map((member,i) => {
                listOfMembers += `[${++i}] ${generateRandomEmoji()}  ${member}\n`
                // msg.channel.send(`${++i} - ${member}`)
            })
            msg.channel.send(listOfMembers)
            msg.channel.send('Flamingos sorteados !!').then(sentMessage => {
                sentMessage.react('🎄');
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

client.login(token);