const { readFileSync } = require('node:fs');

const processes = [
  {
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
    title: 'Embed objesinden "attachFiles" metodu v13\'te kaldÄ±rÄ±lmÄ±ÅŸtÄ±r',
    warnMsg:
      'Bu v12 metodu otomatik olarak dÃ¼zeltilemediÄŸi iÃ§in bu metodun yeni kullanÄ±mÄ±na ÅŸu linkten eriÅŸebilirsiniz: https://discordjs.guide/additional-info/changes-in-v13.html#sending-messages-embeds-files-etc'
  },
  {
    name: '.createReactionCollector',
    usage: '.createReactionCollector(argument, { argument })',
    replace: '.createReactionCollector({ argument, argument })',
    newName: '.createReactionCollector',
    freeObject: true
  }
];

module.exports = {
  convert(file) {
    const lines = readFileSync(file, 'utf-8').split('\n');

    for (const line of lines) {
      const process_ = processes.find((process__) =>
        line.includes(process__.name)
      );

      if (process_ === undefined) continue;

      if (process_.throwWarn)
        console.log(`\n\n${process_.title}\n\n${process_.warnMsg}\n\n`);
      else {
        const matches = line
          .slice(line.indexOf(process_.name))
          .match(/\(([^)]+)\)/)[1]
          .split(',')
          .map((match) => match.trim());

        let replaced = process_.replace;

        for (const match of matches) {
          let replaceValue = '';

          if (process_.freeObject) {
            try {
              const paramToken = match.indexOf(':');
              const objectToken = match.indexOf('{');

              let replacedValue = `${match.slice(0, paramToken)}"${match.slice(
                paramToken
              )}`;
              replacedValue = `${replacedValue.slice(
                0,
                objectToken + 2
              )}"${replacedValue.slice(objectToken + 2)}`;

              const parsedValue = JSON.parse(replacedValue);

              for (const row of Object.entries(parsedValue))
                replaceValue = `${row[0]}:${row[1]}`;
            } catch {
              replaceValue = match;
            }
          }

          replaced = replaced.replace('argument', replaceValue);
        }

        let final;

        const match = replaced.match(/\(([^)]+)\)/)[1];

        if (match.startsWith('{') && match.endsWith('}')) {
          const sliced = match.slice(1);
          const objectMatches = sliced
            .substring(0, sliced.length - 1)
            .split(',');

          objectMatches.length = matches.length;

          const joined = objectMatches.join(',');

          //  console.log(joined);

          final = `${process_.newName}({ ${joind} })`;
        } else {
          const paramMatches = match.split(',');

          paramMatches.length = matches.length;

          const joined = paramMatches.join(',');

          final = `${process_.newName}(${joined})`;
        }

        console.log(final);
      }
    }
  }
};
