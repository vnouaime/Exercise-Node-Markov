/** Command-line tool to generate Markov text. */
const MarkovMachine = require('./markov')

const fs = require('fs')
const process = require('process')
const axios = require('axios');

function markovFile(file) {
    /* 
    Returns randomly generated text based on a local text file passed through. 
    */

    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.log("ERROR:", err)
            process.kill(1)
        } else {
            let text = new MarkovMachine(data);

            return text.makeText()
        }
    })
}

async function markovURL(url) {
    /*
    Returns randomly generated text based on url text file passed through. 
    */

    try {
        let {data} = await axios.get(url)
        let text = new MarkovMachine(data);

        return text.makeText()
    } catch (e) {
        console.log(`ERROR: ${e}`)
        process.kill(1)
    }
}


// If command line argument has local file name, it will go to the markovFile generator. Else, it will go to the markovURL generator. 
if (process.argv[2].slice(0, 4) !== 'http') {
    markovFile(process.argv[2])
} else {
    markovURL(process.argv[2])
}
