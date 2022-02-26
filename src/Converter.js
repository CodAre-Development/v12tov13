const {
    readFileSync
} = require('node:fs');

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
    }
];

module.exports = {
    convert(file) {
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
                    console.log(line.replace(process_.name, process_.replace))
                }
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
                            console.log(change)
                            continue;
                        } else {
                            const change = line.replace(find.name, find.replace)
                            console.log(change)
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
                        } catch(e) {
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
                        if(!process_.replace.includes(el)) {
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
                console.log(final);
            }
        }
    }
};
