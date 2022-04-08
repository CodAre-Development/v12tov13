const fs = require("node:fs")
const system = require("./newArgumentSystem")
const read = fs.readFileSync("testScript.txt", "utf-8")
let makeArr = read.split("\n")
makeArr = makeArr.filter(x => x.trim())
makeArr.forEach(el => {
   system.parse(el).then(data => {
       console.log(data)
   })
})
