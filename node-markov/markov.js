/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    /*
    Creates object with keys of words in this.words and values of the next word/s following the word from they key.
    Before adding, checks to see if next word following key is already in object so it is not added again. 
    If there is no word following a key word, then the value will be null. Object is stored under this.chains.
    */
    
    let chains = this.words.reduce((acc, curr, index, arr) => {
      if (Object.keys(acc).includes(curr)) {
        let value = acc[curr]

        value.forEach(word => {
          if (!value.includes(arr[index + 1])) {
            value.push(arr[index + 1])
          } 
        })
      } else if (index < arr.length - 1){
        acc[curr] = [arr[index + 1]]
      } else {
        acc[curr] = [null]
      }
      return acc
    }, {})

    this.chains = chains;
    
  }

  randomFirstWord() {
    /* 
    Returns a random first word to start the sentence from this.chains
    */
    let randomFirstIndex = Math.floor(Math.random() * this.words.length)
    let randomFirstWord = this.words[randomFirstIndex]

    return randomFirstWord
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    /*
    Creates random sentence from this.chains. 
    Loops through words and adds them to sentence until it reaches a null value 
    from this.chains. Will randomly choose an output if the values is more than one word. 
    */
    
    let randomFirstWord = this.randomFirstWord();
    let outputArray = [randomFirstWord];

    for (let i = 1; i < numWords; i++) {
        let currentLoopWord = outputArray.slice(-1)[0];
        let nextWord = this.chains[currentLoopWord];

        if (nextWord && nextWord.length > 0) {
          let randomIndex = Math.floor(Math.random() * nextWord.length);
          let randomWord = nextWord[randomIndex];

          if (randomWord !== null) {
            outputArray.push(randomWord);
          } else {
            break; 
          }
        } else {
           break;
        }
    }
    let generatedText = outputArray.join(' ');
    return generatedText;
    
  }
}

module.exports = MarkovMachine;