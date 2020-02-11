const request = require('request')
const fs = require('fs')

const people = []
const first = "https://swapi.co/api/people/?page=1"

const collect = (url) => new Promise((resolve) => {

    request(url, (err, res) => {
        const body = res.body
        const data = JSON.parse(body)
        const arr = [].concat(data.results)
        arr.forEach(element => {
            people.push(element)
        });

        if (data.next) {
            resolve(collect(data.next))
        }
        else resolve(arr)
    })
})

    ; (async () => {
        await (collect(first).then(() => {
            console.log(people.length)
        }))

        const result = people.filter(x => x.height > 150)
        
        const jsonObject = JSON.stringify(result)
        fs.writeFileSync('People150height.json', jsonObject)
    })()

