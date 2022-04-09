//FONKSİYONLARDA MAX ARGUMENT COUNT GİRİLMELİDİR

let argumentSystem = require("./Replacer")
const processes = [{
        name: '.setAuthor',
        usage: '.setAuthor(argument, argument, argument)',
        replace: '.setAuthor({ 1*name: -SpargumentBd-*1 2*iconURL: -SpargumentBd-*2 3*url: -SpargumentBd-*3 })',
        maxArgsCount: 3,
        newName: '.setAuthor'
    },
    {
        name: '.setFooter',
        usage: '.setFooter(argument, argument)',
        replace: '.setAuthor({ 1*text: -SpargumentBd-*1 2*iconURL: -SpargumentBd-*2 })',
        maxArgsCount: 2,
        newName: '.setFooter'
    },
    {
        name: '.createOverwrite',
        usage: '.createOverwrite(argument, argument)',
        replace: '.permissionOverwrites.create(1*-SpargumentBd-*1 2*-SpargumentBd-*2)',
        maxArgsCount: 2,
        newName: '.permissionOverwrites.create'
    },
    {
        name: '.attachFiles',
        throwWarn: true,
        title: `Embed objesinden "attachFiles" metodu v13'te kaldırılmıştır`,
        warnMsg: `Bu v12 metodu otomatik olarak düzeltilemediği için bu metodun yeni kullanımına şu linkten erişebilirsiniz: https://discordjs.guide/additional-info/changes-in-v13.html#sending-messages-embeds-files-etc`
    },
    {
        name: '.createReactionCollector',
        usage: '.createReactionCollector(argument, argument)',
        replace: '.createReactionCollector({1*-SpargumentBd-*1 2*-SpargumentBd-*2})',
        maxArgsCount: 2,
        newName: '.createReactionCollector'
    },
    {
        name: '.awaitReactions',
        usage: '.awaitReactions(argument, argument)',
        replace: '.awaitReactions({1*-SpargumentBd-*1 2*-SpargumentBd-*2})',
        maxArgsCount: 2,
        newName: '.awaitReactions'
    },
    {
        name: ".ownerID",
        usage: ".ownerID",
        replace: ".ownerId",
        newName: ".ownerId",
        justReplace: true
    },
    {
        name: ".afkChannelID",
        usage: ".afkChannelID",
        replace: ".afkChannelId",
        newName: ".afkChannelId",
        justReplace: true
    },
    {
        name: ".applicationID",
        usage: ".applicationID",
        replace: ".applicationId",
        newName: ".applicationId",
        justReplace: true
    },
    {
        name: ".channelID",
        usage: ".channelID",
        replace: ".channelId",
        newName: ".channelId",
        justReplace: true
    },
    {
        name: ".creatorID",
        usage: ".creatorID",
        replace: ".creatorId",
        newName: ".creatorId",
        justReplace: true
    },
    {
        name: ".guildID",
        usage: ".guildID",
        replace: ".guildId",
        newName: ".guildId",
        justReplace: true
    },
    {
        name: ".lastMessageID",
        usage: ".lastMessageID",
        replace: ".lastMessageId",
        newName: ".lastMessageId",
        justReplace: true
    },
    {
        name: ".parentID",
        usage: ".parentID",
        replace: ".parentId",
        newName: ".parentId",
        justReplace: true
    },
    {
        name: ".partyID",
        usage: ".partyID",
        replace: ".partyId",
        newName: ".partyId",
        justReplace: true
    },
    {
        name: ".processID",
        usage: ".processID",
        replace: ".processId",
        newName: ".processId",
        justReplace: true
    },
    {
        name: ".publicUpdatesChannelID",
        usage: ".publicUpdatesChannelID",
        replace: ".publicUpdatesChannelId",
        newName: ".publicUpdatesChannelId",
        justReplace: true
    },
    {
        name: ".resolveID",
        usage: ".resolveID",
        replace: ".resolveId",
        newName: ".resolveId",
        justReplace: true
    },
    {
        name: ".rulesChannelID",
        usage: ".rulesChannelID",
        replace: ".rulesChannelId",
        newName: ".rulesChannelId",
        justReplace: true
    },
    {
        name: ".sessionID",
        usage: ".sessionID",
        replace: ".sessionId",
        newName: ".sessionId",
        justReplace: true
    },
    {
        name: ".shardID",
        usage: ".shardID",
        replace: ".shardId",
        newName: ".shardId",
        justReplace: true
    },
    {
        name: ".systemChannelID",
        usage: ".systemChannelID",
        replace: ".systemChannelId",
        newName: ".systemChannelId",
        justReplace: true
    },
    {
        name: ".webhookID",
        usage: ".webhookID",
        replace: ".webhookId",
        newName: ".webhookId",
        justReplace: true
    },
    {
        name: ".widgetChannelID",
        usage: ".widgetChannelID",
        replace: ".widgetChannelId",
        newName: ".widgetChannelId",
        justReplace: true
    },
    {
        name: ".workerID",
        usage: ".workerID",
        replace: ".workerId",
        newName: ".workerId",
        justReplace: true
    },
    {
        name: `message`,
        replace: `messageCreate`,
        event: true
    },
    {
        name: '.fetchApplication',
        throwWarn: true,
        title: `Client objesinden "fetchApplication" metodu v13'te kaldırılmıştır`,
        warnMsg: `Bu v12 metodu otomatik olarak düzeltilemediği için bu metodun yeni kullanımına şu linkten erişebilirsiniz: https://discordjs.guide/additional-info/changes-in-v13.html#client-fetchapplication`
    },
    {
        name: ".fetchWidget",
        usage: ".fetchWidget",
        replace: ".fetchGuildWidget",
        newName: ".fetchGuildWidget",
        justReplace: true
    },
    {
        name: '.generateInvite',
        usage: '.generateInvite(argument)',
        replace: `.generateInvite({ scopes: ['bot'], 1*permissions:-SpargumentBd-*1 })`,
        maxArgsCount: 1,
        newName: '.generateInvite'
    },
    {
        name: '.fetchAllMembers',
        throwWarn: true,
        title: `Client options objesinden "fetchAllMembers" seçeneği v13'te kaldırılmıştır`,
        warnMsg: `Daha fazla detay için: https://discordjs.guide/additional-info/changes-in-v13.html#clientoptions-fetchallmembers`
    },
    {
        name: '.messageCacheMaxSize',
        throwWarn: true,
        title: `Client options objesinden "messageCacheMaxSize" seçeneği v13'te kaldırılmıştır. Bunun yerine message manager önbelleğini özelleştirmek için ClientOptions#makeCache kullanınız`,
        warnMsg: `Daha fazla detay için: https://discordjs.guide/additional-info/changes-in-v13.html#clientoptions-messagecachemaxsize`
    },
    {
        name: '.messageEditHistoryMaxSize',
        throwWarn: true,
        title: `Client options objesinden "messageEditHistoryMaxSize" seçeneği v13'te kaldırılmıştır.`,
        warnMsg: `Daha fazla detay için: https://discordjs.guide/additional-info/changes-in-v13.html#clientoptions-messageedithistorymaxsize`
    },
    {
        name: '.setActivity',
        throwWarn: true,
        title: `setActivity metodu v13'te Promise döndürmemektedir. Kodunuzda buna dikkat ediniz`,
        warnMsg: `Daha fazla detay için: https://discordjs.guide/additional-info/changes-in-v13.html#clientuser-setactivity`
    },
    {
        name: '.setAFK',
        throwWarn: true,
        title: `setAFK metodu v13'te Promise döndürmemektedir. Kodunuzda buna dikkat ediniz`,
        warnMsg: `Daha fazla detay için: https://discordjs.guide/additional-info/changes-in-v13.html#clientuser-setafk`
    },
    {
        name: '.setPresence',
        usage: '.setPresence(argument)',
        replace: `.setPresence({ activites: [1*-SpargumentBd-*1] })`,
        maxArgsCount: 1,
        newName: '.setPresence'
    },
    {
        name: '.setStatus',
        throwWarn: true,
        title: `setStatus metodu v13'te Promise döndürmemektedir. Kodunuzda buna dikkat ediniz`,
        warnMsg: `Daha fazla detay için: https://discordjs.guide/additional-info/changes-in-v13.html#clientuser-setstatus`
    },
    {
        name: "Permissions",
        usage: "Permissions(argument)",
        maxArgsCount: 1,
        replace: "Permissions(1*-SpargumentBd-n*1)",
        newName: "Permissions"
    },
    {
        name: "text",
        usage: "text",
        replace: "GUILD_TEXT",
        newName: "GUILD_TEXT",
        useEqualOperatorHandler: {
            what: ".type"
        }
    },
    {
        name: "dm",
        usage: "dm",
        replace: "DM",
        newName: "DM",
        useEqualOperatorHandler: {
            what: ".type"
        }
    },
    {
        name: "voice",
        usage: "voice",
        replace: "GUILD_VOICE",
        newName: "GUILD_VOICE",
        useEqualOperatorHandler: {
            what: ".type"
        }
    },
    {
        name: "category",
        usage: "category",
        replace: "GUILD_CATEGORY",
        newName: "GUILD_CATEGORY",
        useEqualOperatorHandler: {
            what: ".type"
        }
    },
    {
        name: "news",
        usage: "news",
        replace: "GUILD_NEWS",
        newName: "GUILD_NEWS",
        useEqualOperatorHandler: {
            what: ".type"
        }
    },
    {
        name: "store", //bunlar deprecated olcakmış ama salla yine de güncellesin çevirici bişi olmz
        usage: "store",
        replace: "GUILD_STORE",
        newName: "GUILD_STORE",
        useEqualOperatorHandler: {
            what: ".type"
        }
    },
    {
        name: "unknown",
        usage: "unknown",
        replace: "UNKNOWN",
        newName: "UNKNOWN",
        useEqualOperatorHandler: {
            what: ".type"
        }
    },
    {
        name: ".addMember",
        usage: ".addMember",
        replace: ".members.add",
        newName: ".members.add",
        justReplace: true
    },
    {
        name: ".fetchBans",
        usage: ".fetchBans",
        replace: ".bans.fetch",
        newName: ".bans.fetch"
    },
    {
        name: '.fetchBan',
        usage: '.fetchBan(argument)',
        replace: `.bans.fetch(1*-SpargumentBd-*1)`,
        maxArgsCount: 1,
        newName: '.bans.fetch'
    },
    {
        name: ".fetchInvites",
        usage: ".fetchInvites",
        replace: ".invites.fetch",
        newName: ".invites.fetch",
        justReplace: true
    },
    {
        name: ".fetchVanityCode",
        usage: ".fetchVanityCode",
        replace: ".fetchVanityData",
        newName: ".fetchVanityData",
        justReplace: true
    },
    {
        name: ".updateOverwrite",
        usage: ".updateOverwrite",
        replace: ".permissionOverwrites.edit",
        newName: ".permissionOverwrites.edit",
        justReplace: true
    },
    {
        name: '.members.ban',
        usage: '.members.ban(argument, argument)',
        replace: `.members.ban(1*-SpargumentBd-*1 2*{ reason: -SpargumentBd- }*2)`,
        maxArgsCount: 2,
        newName: '.members.ban'
    },
    {
        name: '.ban',
        usage: '.ban(argument)',
        replace: `.ban(1*{ reason: -SpargumentBd- }*1)`,
        maxArgsCount: 1,
        newName: '.ban'
    },
    {
        name: ".respawnAll",
        usage: ".respawnAll(argument, argument, argument)",
        replace: ".respawnAll({ 1*shardDelay: -SpargumentBd-*1 2* respawnDelay: -SpargumentBd-*2 3* timeout:-SpargumentBd-*3 })",
        maxArgsCount: 3,
        newName: ".respawnAll"
    },
    {
        name: ".spawn",
        usage: ".spawn(argument, argument, argument)",
        replace: ".spawn({ 1*amount: -SpargumentBd-*1 2* delay: -SpargumentBd-*2 3* timeout:-SpargumentBd-*3 })",
        maxArgsCount: 3,
        newName: ".spawn"
    },
    {
        name: '.mfaLevel',
        throwWarn: true,
        title: `mfaLevel özelliği v13'te Enum(Numaralandırılmış tür) döndürmektedir. Kodunuzda buna dikkat ediniz`,
        warnMsg: `Daha fazla detay için: https://discordjs.guide/additional-info/changes-in-v13.html#guild-mfalevel`
    },
    {
        name: '.owner',
        throwWarn: true,
        title: `Guild objesinden owner özelliği v13'te fetchOwner() metodu ile değiştirilmiştir. Kodunuzda buna dikkat ediniz`,
        warnMsg: `Daha fazla detay için: https://discordjs.guide/additional-info/changes-in-v13.html#guild-owner` 
    },
    {
        name: ".setWidget",
        usage: ".setWidget",
        replace: ".setWidgetSettings",
        newName: ".setWidgetSettings",
        justReplace: true
    },
    {
        name: ".guild.voice",
        usage: ".guild.voice",
        replace: ".guild.me.voice",
        newName: ".guild.me.voice",
        justReplace: true
    },
    {
        name: ".overwritePermissions",
        usage: ".overwritePermissions",
        replace: ".permissionOverwrites.set",
        newName: ".permissionOverwrites.set",
        justReplace: true
    },
    {
        name: '.setTopic',
        throwWarn: true,
        title: `GuildChannel objesinden setTopic metodu v13'te kaldırılmıştır. Kodunuzda buna dikkat ediniz`,
        warnMsg: `Daha fazla detay için: https://discordjs.guide/additional-info/changes-in-v13.html#guildchannel-settopic` 
    },
    {
        name: ".updateOverwrite",
        usage: ".updateOverwrite",
        replace: ".permissionOverwrites.edit",
        newName: ".permissionOverwrites.edit",
        justReplace: true
    },
    {
        name: ".hasPermission",
        usage: ".hasPermission",
        replace: ".permissions.has",
        newName: ".permissions.has",
        justReplace: true
    },
    {
        name: '.edits',
        throwWarn: true,
        title: `Message objesinden edits özelliği v13'te kaldırılmıştır. Kodunuzda buna dikkat ediniz`,
        warnMsg: `Daha fazla detay için: https://discordjs.guide/additional-info/changes-in-v13.html#message-edits` 
    },
    {
        name: ".FLAGS.MANAGE_EMOJIS",
        usage: ".FLAGS.MANAGE_EMOJIS",
        replace: ".FLAGS.MANAGE_EMOJIS_AND_STICKERS",
        newName: ".FLAGS.MANAGE_EMOJIS_AND_STICKERS",
        justReplace: true
    },
    {
        name: ".FLAGS.DISCORD_PARTNER",
        usage: ".FLAGS.DISCORD_PARTNER",
        replace: ".FLAGS.PARTNERED_SERVER_OWNER",
        newName: ".FLAGS.PARTNERED_SERVER_OWNER",
        justReplace: true   
    },
    {
        name: ".FLAGS.VERIFIED_DEVELOPER",
        usage: ".FLAGS.VERIFIED_DEVELOPER",
        replace: ".FLAGS.EARLY_VERIFIED_BOT_DEVELOPER",
        newName: ".FLAGS.EARLY_VERIFIED_BOT_DEVELOPER",
        justReplace: true      
    },
    {
        name: '.kick',
        throwWarn: true,
        title: `Eğer kick metodunuz sesli kanaldan üye atmak için kullanıldıysa bu metodun adı Discord.js v13'te disconnect olarak değiştirilmiştir. Kodunuzda buna dikkat ediniz`,
        warnMsg: `Daha fazla detay için: https://discord.js.org/#/docs/discord.js/stable/class/VoiceState?scrollTo=disconnect` 
    },
    {
        name: '.broadcastEval',
        throwWarn: true,
        title: `Bu metodun kullanımı v13te tamamen değiştirilmiştir ve çevirici programı düzeltmeleri uygulayamamıştır yeni kullanım için aşağıda bulunan bağlantıyı takip ediniz.`,
        warnMsg: `Daha fazla detay için: https://discordjs.guide/additional-info/changes-in-v13.html#shardclientutil-broadcasteval` 
    }
]

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}


function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

module.exports = {
    parse: function (usage) {
        return new Promise((resolve, reject) => {
            let process_ = processes.find(x => usage.includes(x.name))

            if (process_ === undefined) {
                resolve("No data found!")
                return;
            }
            if (process_.event && !usage.includes(".on(")) {
                process_ = processes.find(x => usage.includes(x.name) && x.event !== true)

                if (process_ === undefined) {
                    resolve("No data found!")
                    return;
                }
            }

            if (process_.throwWarn) {
                resolve({
                    title: process_.title,
                    message: process_.warnMsg
                })
                return;
            }

            if (process_.justReplace) {
                resolve({
                    before: replaceAll(usage.trim(), "Ð", ""),
                    after: replaceAll(usage.replace(process_.name, process_.newName).trim(), "Ð", "")
                })
                return
            }

            if (process_.useEqualOperatorHandler) {
                if (replaceAll(usage, " ", "").includes(`${process_.useEqualOperatorHandler.what}=="${process_.name}"`) || replaceAll(usage, " ", "").includes(`${process_.useEqualOperatorHandler.what}=='${process_.name}'`) || replaceAll(usage, " ", "").includes(process_.useEqualOperatorHandler.what + "==`" + process_.name + "`") || replaceAll(usage, " ", "").includes(`${process_.useEqualOperatorHandler.what}==="${process_.name}"`) || replaceAll(usage, " ", "").includes(`${process_.useEqualOperatorHandler.what}==='${process_.name}'`) || replaceAll(usage, " ", "").includes(process_.useEqualOperatorHandler.what + "===`" + process_.name + "`")) {
                    let currentResult = process_.useEqualOperatorHandler.what + "==`" + process_.replace + "`"
                    resolve({
                        before: replaceAll(usage.trim(), "Ð", ""),
                        after: replaceAll(currentResult.trim(), "Ð", "")
                    })
                }
            }

            if (process_.event) {
                if (usage.includes(`.on("${process_.name}"`) || usage.includes(`.on('${process_.name}'`) || usage.includes(".on(" + "`" + process_.name + "`")) {
                    resolve({
                        before: replaceAll(usage.trim(), "Ð", ""),
                        after: replaceAll(usage.replace(process_.name, process_.replace).trim(), "Ð", "")
                    })
                }
                return
            }

            const execArgument = argumentSystem.exec(process_.replace, process_.maxArgsCount, usage)
            resolve({
                before: replaceAll(usage.trim(), "Ð", ""),
                after: execArgument
            })
        })
    }
}
