const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const agree = "✅";
const disagree = "❎";
const bot = new Discord.Client({ disableEveryone: true });
bot.commands = new Discord.Collection();
require('dotenv/config');
const http = require('http');
const port = process.env.PORT || 3000;
http.createServer().listen(port);

const prefix = botconfig.prefix
const token = process.env.TOKEN


bot.on("ready", async () => {
 console.log(`${bot.user.username} is online!`);
 bot.user.setActivity("your Commands!", { type: "LISTENING" })
});

bot.on("message", async message => {
 if (message.author.bot) return;
 if (message.channel.type === "dm") return;

 let prefix = botconfig.prefix;
 let messageArray = message.content.split(" ");
 let cmd = messageArray[0];
 let args = messageArray.slice(1);

 if (cmd === `${prefix}help`) {
  let sicon = message.guild.iconURL;
  let roles = new Discord.RichEmbed()
   .setColor("GREEN")
   .setThumbnail(sicon)
   .setDescription("**COMMANDS**")
   .setTimestamp()
   .setFooter("Made with ❤ by @Ich#3236")
   .addField("!kick (This function is just for the Server Staff)", "To kick user")
   .addField("!ban (This function is just for the Server Staff)", "To ban user")
   .addField("!botinfo", "To get botinfo's")
   .addField("!userinfo", "To get userinfo's")
   .addField("!report", "To report a user")
   .addField("!tmute <@user> <time>", "To mute a User for a limited Time")

  message.delete().catch(O_o => { });
  return message.channel.send(roles);
 }

 if(cmd === `${prefix}report`){
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Couldn't find that User");
    let reason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("RED")
    .setFooter("Made with ❤ by @Ich#3236")
    .setTimestamp()
    .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported by", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", reason);

    let reportschannel = message.guild.channels.find(`name`, "incidents");
    if(!reportschannel) return message.channel.send("Couldn't find reports Channel.");

    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed)

    return;
}

 if (cmd === `${prefix}roles`) {
  ROLEZZ = message.guild.roles.array()

  var ROLES = "";

  ROLEZZ.forEach(function (element) {
   ROLES += element.name + "\n"
  });

  message.channel.send("```" + "\n" +
   "---------------------------------" + "\n" +
   "ALL SERVER ROLES" + "\n" +
   "---------------------------------" + "\n" +
   `${ROLES}` + "```");

 }


 if (cmd === `${prefix}kick`) {

  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!kUser) message.channel.send("Can´t find user!");
  let kReason = args.join(" ").slice(22);
  if (!message.member.hasPermissions("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
  if (kUser.hasPermissions("MANAGE_MESSAGES")) return message.channel.send("That Person can´t be kicked!");

  let kickEmbed = new Discord.RichEmbed()
   .setDescription("Kick")
   .setColor("#ff0000")
   .setTimestamp()
   .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
   .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
   .addField("Kicked in", message.channel)
   .addField("Time", message.createdAt)
   .addField("Reason", kReason)
   .setFooter("Made with ❤ by @Ich#3236");

  let kickChannel = message.guild.channels.find(`name`, "incidents");
  if (!kickChannel) return message.channel.send("can´t find incidents channel.");

  message.guild.member(kUser).kick(kReason);
  kickChannel.send(kickEmbed);

  return;
 }

 if (cmd === `${prefix}ban`) {

  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!bUser) message.channel.send("Can´t find user!");
  let bReason = args.join(" ").slice(22);
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("No can do pal!");
  if (bUser.hasPermission("ADMINISTRATOR")) return message.channel.send("That Person can´t be Banned!");

  let banEmbed = new Discord.RichEmbed()
   .setDescription("Ban")
   .setTimestamp()
   .setColor("#ff0000")
   .addField("Banned User", `${bUser} with ID ${bUser.id}`)
   .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
   .addField("Banned in", message.channel)
   .addField("Time", message.createdAt)
   .addField("Reason", bReason)
   .setFooter("Made with ❤ by @Ich#3236");

  let banChannel = message.guild.channels.find(`name`, "incidents");
  if (!banChannel) return message.channel.send("can´t find incidents channel.");

  message.guild.member(bUser).ban(bReason);
  banChannel.send(banEmbed);

  return;
 }



 if (cmd === `${prefix}serverinfo`) {

  let sicon = message.guild.iconURL;
  let serverembed = new Discord.RichEmbed()
   .setDescription("Server Information")
   .setColor("#00af11")
   .setTimestamp()
   .setThumbnail(sicon)
   .addField("Server Name", message.guild.name)
   .addField("Created On", message.guild.createdAt)
   .addField("You Joined", message.member.joinedAt)
   .addField("Total Member", message.guild.memberCount)
   .setFooter("Made with ❤ by @Ich#3236")

  return message.channel.send(serverembed);
 }

 if (cmd === `${prefix}botinfo`) {

  let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.RichEmbed()
   .setDescription("Bot Information")
   .setColor("#00af11")
   .setThumbnail(bicon)
   .setTimestamp()
   .addField("Bot Name", bot.user.username)
   .addField("Created On", bot.user.createdAt)
   .setFooter("Made with ❤ by @Ich#3236");

  return message.channel.send(botembed);

 }

 if (cmd === `${prefix}userinfo`) {

  let uicon = message.author.avatarURL;
  let userembed = new Discord.RichEmbed()
   .setDescription("User info")
   .setColor("RANDOM")
   .setThumbnail(uicon)
   .setTimestamp()
   .addField("User Name", message.author.username)
   .addField("Created On", message.author.createdAt)
   .setFooter("Made with ❤ by @Ich#3236");

  return message.channel.send(userembed);

 }

 if(cmd === `${prefix}tmute`) {
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
                  if(!tomute) return message.reply("Couldnt find the specified user!");
                  if(tomute.hasPermission("ADMINISTRATOR")) return message.reply("I cant mute them!");
                  let muterole = message.guild.roles.find(`name`, "muted");
   
                      if(!muterole){
                          try{
                              muterole = await message.guild.createRole({
                                  name: "muted",
                                  color: "#000000",
                                  permissions: []
                              })
                                      message.guild.channels.forEach(async (channel, id) => {
                                          await channel.overwritePermissions(muterole, {
                                              SEND_MESSAGES: false,
                                              ADD_REACTIONS: false
                                          });
                                      });
   
                          }catch(e){
                              console.log(e.stack);
                          }
                      }
   
                         let mutetime = args[1];
                         if(!mutetime) return message.reply("Please input a certain ammount of time to mute the user!");
                         
                         await(tomute.addRole(muterole.id));
                         message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);
   
                         setTimeout(function(){
                           tomute.removeRole(muterole.id);
                           message.channel.send(`<@${tomute.id}> has been unmuted!`);  
                         }, ms(mutetime));
   
   
          }

          
    });

    bot.on('error', err => {
        console.log(err);
    });

bot.login(botconfig.token);
