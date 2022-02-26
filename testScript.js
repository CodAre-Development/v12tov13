
const collector = message.createReactionCollector(filter, { time: 15000 });
const reactions = await message.awaitReactions(filter, { time: 15000 });
console.log(guild.ownerID)

client.on(`message`, () => {

})
