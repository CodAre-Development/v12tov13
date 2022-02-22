const fs = require("fs")

module.exports = {
   Convert(file) {
       const read = fs.readFileSync(file, "utf-8")
        const splitIntoLines = read.split("\n")
        const processes = [
            {
                name: ".setAuthor",
                usage: ".setAuthor(argument,argument,argument)",
                replace: ".setAuthor({name: argument, iconURL: argument, url: argument})",
                newName: ".setAuthor",
            },
            {
                name: ".createOverwrite",
                usage: ".createOverwrite(argument,argument)",
                replace: ".permissionOverwrites.create(argument, argument)",
                newName: ".permissionOverwrites.create",
            },
            {
                name: ".attachFiles",
                throwWarn: true,
                title: `Embed objesinden "attachFiles" metodu v13'te kaldırılmıştır`,
                warnMsg: `Bu v12 metodu otomatik olarak düzeltilemediği için bu metodun yeni kullanımına şu linkten erişebilirsiniz: https://discordjs.guide/additional-info/changes-in-v13.html#sending-messages-embeds-files-etc`
            },
            {
                name: ".createReactionCollector",
                usage: ".createReactionCollector(argument, { argument });",
                replace: ".createReactionCollector({ argument, argument })",
                newName: ".createReactionCollector",
                freeObject: true
            }
        ]

        splitIntoLines.forEach(el => {
            const find = processes.find(element => el.includes(element.name))
            if(find === undefined) return
            if(find.throwWarn === true) {
                console.log(`

${find.title}

${find.warnMsg}
                
                `)
            } else {
                const slice = el.slice(el.indexOf(find.name))
                const regex = slice.match(/\(([^)]+)\)/)[1]
                const splitRegex = regex.split(",")
                const regex2 = []
                splitRegex.forEach(element => {
                    regex2.push(element.trim())
                })
                let replaceget = find.replace
                regex2.forEach(element => {
                    let dt = ""
                    if(find.freeObject === true) {
                        try{
                            let stringpls = element
                            const getindex = stringpls.indexOf(":")
                            const getindex2 = stringpls.indexOf("{")


                            let insert = [stringpls.slice(0, getindex), `"`, stringpls.slice(getindex)].join('')
                            insert = [insert.slice(0, getindex2+2), `"`, insert.slice(getindex2+2)].join('')
                            const parsepls = JSON.parse(insert)
                            Object.entries(parsepls).forEach(el => {
                                dt = el[0] + ":" + el[1]
                            })
                        }catch(e) {
                            dt = element
                        }
                     
                    } 
                    replaceget = replaceget.replace("argument", dt)
                })
                let final;
                let regex3 = replaceget.match(/\(([^)]+)\)/)[1]
                if(regex3.startsWith("{") && regex3.endsWith("}")) {
                    const slice1 = regex3.slice(1)
                    const sub1 = slice1.substring(0, slice1.length-1)
                    let splitInside = sub1.split(",")
                 
                    splitInside.length = regex2.length
                    const joinAgain = splitInside.join(",")
                //    console.log(joinAgain)
                    final = `${find.newName}({${joinAgain}})`
                } else {
                    let splitInside = regex3.split(",")
                    splitInside.length = regex2.length
                    const joinAgain = splitInside.join(",")
                    final = `${find.newName}(${joinAgain})`
                }
    
                console.log(final)
            }
           
        })


   }
}
