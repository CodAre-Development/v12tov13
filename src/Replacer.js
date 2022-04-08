let between = require("./Between").getFromBetween

//Yeni argüman sistemini yazarken akıl sağlığımı kaybettim 😞

module.exports = {
    exec(replace, maxArgumentCount, userInput) {

        let res = replace
        let count = maxArgumentCount
        count++
        let str = userInput
        const results = between.get(str, "Ð", "Ð")
        const results2 = between.get(res, "-Sp", "Bd-")
        res = res.replaceAll("-Sp", "")
        res = res.replaceAll("Bd-", "")
        results.forEach(function (el, i) {
            res = res.replace(results2[i], el)
        })
        String.prototype.replaceBetween = function (start, end, what) {
            return this.substring(0, start) + what + this.substring(end);
        };

        let storage = []
        for (let index = 1; index < count; index++) {
            let results3 = between.get(res, index + "*", "*" + index)
            storage.push(results3)

        }
        const filter = storage.filter(x => x[0].includes("argument"))
        if (filter.length == 0) {
            
            for (let el = 1; el < storage.length + 1; el++) {
                const getIndex1 = res.indexOf("*" + el)
                const getIndex2 = res.indexOf(el + 1 + "*")
                if (getIndex2 !== -1) {
                    res = res.replaceBetween(getIndex1, getIndex2, ",")
                }
              
                res = res.replace(new RegExp(`\\*${el}\\b`), '');
                res = res.replace(el + "*", "")  
            }
        } else {
           
            filter.forEach(el => {
                let getIndex = storage.indexOf(el) + 1
                const getBetween = between.get(res, getIndex + "*", "*" + getIndex)
                res = res.replace(getBetween, "")
                res = res.replace(getIndex + "*", "")
                res = res.replace("*" + getIndex, "")
                for (let index = 1; index < getIndex; index++) {
                    if (index !== getIndex - 1) {
                        const getIndex1 = res.indexOf("*" + index)
                        const getIndex2 = res.indexOf(index + 1 + "*")
                        res = res.replaceBetween(getIndex1, getIndex2, ",")
                    }
                    res = res.replace(index + "*", "")
                    res = res.replace("*" + index, "")
                    res = res.trimStart(",")
                }
            })
        }
        return res
    }
}
