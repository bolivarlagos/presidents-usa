const axios = require('axios')
const cheerio = require('cheerio')

const rootUrl = 'https://en.wikipedia.org'
const wikiUrl = rootUrl + '/wiki/List_of_Presidents_of_the_United_States'

const getData = async () => {
    try {

        const res = await axios.get(wikiUrl)
        const html = await res.data

        let listOfPresidents = []
        
        const $ = cheerio.load(html)

        let presidents = $('td > b > a')
        
        for(let president of presidents){
            
            let presidentInfo = {
                name: president.attribs.title,
                bio: rootUrl + president.attribs.href,  
                number: listOfPresidents.length + 1              
            }
            listOfPresidents.push(presidentInfo)
        }
        console.log(listOfPresidents)
        return listOfPresidents

    } catch (error) {
        console.log(error)        
    }
}

module.exports = getData
