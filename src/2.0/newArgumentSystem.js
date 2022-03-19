const processes = [{
        name: '.setAuthor',
        usage: '.setAuthor(argument, argument, argument)',
        replace: '.setAuthor({ -Spname: argument,Bd- -SpiconURL: argument,Bd- -Spurl: argumentBd- })',
        newName: '.setAuthor'
    },
    {
        name: '.createOverwrite',
        usage: '.createOverwrite(argument, argument)',
        replace: '.createOverwrite(-Spargument,Bd- -SpargumentBd-)',
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
        usage: '.createReactionCollector(argument, { argument })',
        replace: '.createReactionCollector({ -Spargument,Bd- -SpargumentBd- })',
        newName: '.createReactionCollector',
        freeObject: true
    },
    {
        name: ".awaitReactions",
        usage: ".awaitReactions(argument, { argument })",
        replace: ".awaitReactions({-Spargument,Bd- -SpargumentBd-})",
        newName: ".awaitReactions",
        freeObject: true
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
    }
]


function fetchArgs(str) {
    regex = str.split(/[-SpBd-]/)
    regex = regex.filter(x => x.trim().length !== 0)
    regex = regex.slice(1)
    regex.length = regex.length - 1
    return regex
} //ALLAH BELANI VERSİN REGEX

function getParant(str) {
    const getIndex = str.indexOf("(")
    str = str.slice(getIndex + 1).trim()
    str = str.trim()
    const getlastIndex = str.lastIndexOf(")")
    str = str.substring(0, getlastIndex)
    return str
}


module.exports = {
    parse: function (usage) {
        return new Promise((resolve, reject) => {

            const process_ = processes.find(x => usage.includes(x.name))
            if (process_ === undefined) {
                resolve("No data found!")
                return;
            }
            if(process_.throwWarn) {
                resolve({
                    title: process_.title,
                    message: process_.warnMsg
                })
                return;
            }
            if(process_.justReplace) {
                resolve({
                    before: usage,
                    after: usage.replace(process_.name, process_.newName)
                })
                return
            }


            let copy = usage
            copy = copy.match(/\(.*?\)/g).map(x => x.replace(/[ÐÐ]/g, ""));

            copy = copy[0].slice(1)
            copy = copy.substring(0, copy.length - 1).split(",")
            copy = copy.filter(x => x.trim()) //strict mode kullanan gaydir.
            get = process_.replace
            let fetchArguments = fetchArgs(get)
            fetchArguments.length = copy.length
            if (fetchArguments[fetchArguments.length - 1].endsWith(",")) {
                fetchArguments[fetchArguments.length - 1] = fetchArguments[fetchArguments.length - 1].substring(0, fetchArguments[fetchArguments.length - 1].length - 1)
            }
            get = getParant(get)

            let res = []
            let sucstring = "{ "
            let empty = ""
            fetchArguments.forEach(function (el, i) {
                if (process_.freeObject === true) {
                    if (copy[i].trim().startsWith("{") && copy[i].trim().endsWith("}")) {
                        copy[i] = copy[i].trim().slice(1).trim()
                        copy[i] = copy[i].substring(0, copy[i].length - 1)
                    }
                }
                res.push(el.replace("argument", copy[i].trim()).trim())
            })
            if (get.startsWith("{") && get.endsWith("}")) {

                //obje ise
                res.forEach(el => {
                    sucstring += el
                })
                resolve({
                    before: usage.replaceAll("Ð", ""),
                    after: process_.newName + "(" + sucstring + " })"
                })



            } else {
                //düz argüman ise
                res.forEach(el => {
                    empty += el
                })
                resolve({
                    before: usage.replaceAll("Ð", ""),
                    after: process_.newName + "(" + empty + ")"
                })
            }
        })

    }
}
