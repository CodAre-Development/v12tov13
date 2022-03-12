const {
    readFileSync
} = require('node:fs');

const JSON5 = require("json5")


const processes = [{
        name: '.setAuthor',
        usage: '.setAuthor(argument, argument, argument)',
        replace: '.setAuthor({ name: argument, iconURL: argument, url: argument })',
        newName: '.setAuthor'
    },
    {
        name: '.createOverwrite',
        usage: '.createOverwrite(argument, argument)',
        replace: '.permissionOverwrites.create(argument, argument)',
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
        replace: '.createReactionCollector({ argument, argument })',
        newName: '.createReactionCollector',
        freeObject: true
    },
    {
        name: ".awaitReactions",
        usage: ".awaitReactions(argument, { argument })",
        replace: ".awaitReactions({argument, argument})",
        newName: ".awaitReactions",
        freeObject: true
    },
    {
        name: ".ownerID",
        usage: ".ownerID",
        replace: ".ownerId",
        newName: ".ownerId"
    },
    {
        name: `message`,
        replace: `messageCreate`,
        event: true
    },
    {
        name: ".fetchApplication",
        usage: ".fetchApplication",
        replace: ".application",
        newName: ".application",
        isFunc: false
    },
    {
        name: ".fetchWidget",
        usage: ".fetchWidget",
        replace: ".fetchGuildWidget",
        newName: ".fetchGuildWidget"
    },
    {
        name: ".generateInvite",
        usage: ".generateInvite(argument)",
        replace: ".generateInvite({scopes: ['bot'], permissions: argument})",
        newName: ".generateInvite"
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
        name: 'user.setActivity',
        throwWarn: true,
        title: `setActivity metodu v13'te Promise döndürmemektedir. Kodunuzda buna dikkat ediniz`,
        warnMsg: `Daha fazla detay için: https://discordjs.guide/additional-info/changes-in-v13.html#clientuser-setactivity`
    },
    {
        name: 'user.setAFK',
        throwWarn: true,
        title: `setAFK metodu v13'te Promise döndürmemektedir. Kodunuzda buna dikkat ediniz`,
        warnMsg: `Daha fazla detay için: https://discordjs.guide/additional-info/changes-in-v13.html#clientuser-setafk`
    },
    {
        name: 'user.setPresence',
        usage: "user.setPresence({ activity: argument })",
        replace: "user.setPresence({ activities: [JSONresponse] })",
        newName: "user.setPresence",
        useParser: true,
        pullFrom: "0->activity"
    }
];

module.exports = {
    convert(file) {
        let res = []
        const read = readFileSync(file, 'utf-8')
        const lines = read.split("\n")

        for (const line of lines) {
            const process_ = processes.find((process__) =>
                line.includes(process__.name)
            );

            if (process_ === undefined) continue;

            if (process_.throwWarn) {
                console.log(`\n\n${process_.title}\n\n${process_.warnMsg}\n\n`);
            } else if (process_.event) {
                if (line.includes(`.on("${process_.name}"`) || line.includes(`.on('${process_.name}'`) || line.includes(".on(" + "`" + process_.name + "`")) {
                    res.push(line.replace(process_.name, process_.replace))
                }
            } else {
                if (process_.useParser) {
                    const slice = line.trim().slice(line.indexOf(process_.name))
                    const slice2 = slice.slice(process_.name.length + 1).trim()
                    let sub;
                    let sub2 = []
                    if (slice2.endsWith(";")) {
                        sub = slice2.substring(0, slice2.length - 2).split(",")
                    } else {
                        sub = slice2.substring(0, slice2.length - 1).split(",")
                    }
                    sub.forEach(el => {
                        sub2.push(el.trim())
                    })

                    const pullfrom = process_.pullFrom,
                        arrIndex = Number(pullfrom.substring(0, pullfrom.indexOf("->"))),
                        keyValue = pullfrom.slice(pullfrom.indexOf("->") + 2),
                        getArrayElement = sub2[arrIndex],
                        parse = JSON5.parse(getArrayElement),
                        full = process_.replace.replace("JSONresponse", JSON5.stringify(parse[keyValue]))
                        res.push(full)
                        continue;
                } else {
                    let matches;
                    try {
                        const matches1 = line
                            .slice(line.indexOf(process_.name))
                            .match(/\(([^)]+)\)/)[1]
                            .split(',')
                            .map((match) => match.trim());
                        matches = matches1
                    } catch (e) {
                        const find = processes.find(el => line.includes(el.name))
                        if (find == undefined) {

                        } else {
                            if (process_.isFunc == false) {
                                const change = line.replace(find.name, find.replace).replace("(", "").replace(")", "")
                                res.push(change)
                                continue;
                            } else {
                                const change = line.replace(find.name, find.replace)
                                res.push(change)
                                continue;
                            }
                        }

                    }


                    let replaced = process_.replace;
                    for (const match of matches) {
                        let replaceValue = '';

                        if (process_.freeObject) {
                            try {
                                const paramToken = match.indexOf(':');
                                const objectToken = match.indexOf('{');

                                let replacedValue = `${match.slice(0, paramToken)}"${match.slice(paramToken)}`;
                                replacedValue = `${replacedValue.slice(0,objectToken + 2)}"${replacedValue.slice(objectToken + 2)}`;

                                const parsedValue = JSON.parse(replacedValue);

                                for (const row of Object.entries(parsedValue)) {
                                    replaceValue = `${row[0]}:${row[1]}`;
                                }
                            } catch (e) {
                                replaceValue = match;
                            }
                        } else {
                            replaceValue = match
                            replaced = replaced.replace('argument', replaceValue);
                        }
                        replaced = replaced.replace('argument', replaceValue);
                    }

                    let final;

                    const match = replaced.match(/\(([^)]+)\)/)[1];

                    if (match.startsWith('{') && match.endsWith('}')) {
                        const sliced = match.slice(1);
                        let objectMatches = sliced.substring(0, sliced.length - 1)
                        objectMatches = objectMatches.split(",");
                        let int = matches.length
                        objectMatches.forEach(el => {
                            if (!process_.replace.includes(el)) {
                                int++
                            }
                        })
                        objectMatches.length = int;
                        objectMatches = objectMatches.filter(el => el)

                        const joined = objectMatches.join(',');

                        final = `${process_.newName}({ ${joined} })`;
                    } else {
                        const paramMatches = match.split(',');
                        paramMatches.length = matches.length;

                        const joined = paramMatches.join(',');
                        if (process_.replace.includes("(") && process_.replace.includes(")")) {
                            final = `${process_.newName}(${joined})`;
                        } else {
                            final = process_.newName
                        }
                    }
                    res.push(final)
                    console.log(res)
                }
            }
        }
    }
};
