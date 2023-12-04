const MarkovMachine = require('./markov')

describe('randomFirstWord Tests', function() {
    test("Generates a random word to start the Maklov sentence with", () => {
        let mm = new MarkovMachine("the cat in the hat");
        let randomFirstWord = mm.randomFirstWord()

        expect(randomFirstWord).not.toBeNull();
    })
})

describe('makeText Tests', function() {
    test("makeText generates text with spaces", function() {
        let mm = new MarkovMachine("the cat in the hat");
        let generatedText = mm.makeText();
        let words = generatedText.split(/\s+/);
    
        if (words.length !== 1) {
            expect(generatedText).toMatch(/\s/);
        }
        
    })
    
    test('makeText generates text with expected number of words', () => {
        let mm = new MarkovMachine("I do not like them with a fox");
        let numWords = 5;
        let generatedText = mm.makeText(numWords);
        let words = generatedText.split(/\s+/);
       
        expect(words.length).toBeLessThanOrEqual(numWords);
    });

    test('Tests to make sure that random text generated from makeText does not match.', () => {
        let mm = new MarkovMachine("the cat in the hat");
        let generatedText1 = mm.makeText()
        let generatedText2 = mm.makeText()

        expect(generatedText1).not.toEqual(generatedText2)
    })

})
