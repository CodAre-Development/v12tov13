let between = require("./Between").getFromBetween

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
        name: '.ban',
        usage: '.ban(argument)',
        replace: `.ban(1*{ reason: -SpargumentBd- }*1)`,
        maxArgsCount: 1,
        newName: '.bans.fetch'
    },
    {
        name: ".respawnAll",
        usage: ".respawnAll(argument, argument, argument)",
        replace: ".respawnAll({ 1*shardDelay: -SpargumentBd-*1 2* respawnDelay: -SpargumentBd-*2 3* timeout:-SpargumentBd-*3 })",
        maxArgsCount: 3,
        newName: ".respawnAll"
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
                    before: usage.trim(),
                    after: usage.replace(process_.name, process_.newName).trim()
                })
                return
            }

            if (process_.useEqualOperatorHandler) {
                if (replaceAll(usage, " ", "").includes(`${process_.useEqualOperatorHandler.what}=="${process_.name}"`) || replaceAll(usage, " ", "").includes(`${process_.useEqualOperatorHandler.what}=='${process_.name}'`) || replaceAll(usage, " ", "").includes(process_.useEqualOperatorHandler.what + "==`" + process_.name + "`") || replaceAll(usage, " ", "").includes(`${process_.useEqualOperatorHandler.what}==="${process_.name}"`) || replaceAll(usage, " ", "").includes(`${process_.useEqualOperatorHandler.what}==='${process_.name}'`) || replaceAll(usage, " ", "").includes(process_.useEqualOperatorHandler.what + "===`" + process_.name + "`")) {
                    let currentResult = process_.useEqualOperatorHandler.what + "==`" + process_.replace + "`"
                    resolve({
                        before: usage.trim(),
                        after: currentResult.trim()
                    })
                }
            }

            if (process_.event) {
                if (usage.includes(`.on("${process_.name}"`) || usage.includes(`.on('${process_.name}'`) || usage.includes(".on(" + "`" + process_.name + "`")) {
                    resolve({
                        before: usage.trim(),
                        after: usage.replace(process_.name, process_.replace).trim()
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
