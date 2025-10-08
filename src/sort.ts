type Groups = {
  word: string;
  position: string;
};

type Result = RegExpExecArray & { groups: Groups };

/**
 * WHEN:
 * ```ts
 * const result = REGEX.exec("e11evEn")
 * ```
 *
 * THEN:
 * ```ts
 * result.groups // { word: "e11evEn", position: "11" }
 * ```
 */
const REGEX = /(?<word>[a-zA-Z]*(?<position>\d+)[a-zA-Z]*)\s?/g;

/**
 * WHEN:
 * ```ts
 * const word = new Word({
 *   word: "e11evEn",
 *   position: "11",
 * })
 * ```
 *
 * THEN:
 * ```ts
 * word // { "e11evEn", position: 11 }
 * word.valueOf() // "e11evEn"
 * word.position // 11
 * word.length // 7
 * [word, "ABC"].join(" ") // "e11evEn ABC"
 * ```
 */
class Word extends String {
  position: number;

  constructor({ word, position }: Groups) {
    super(word);

    this.position = parseInt(position, 10);
  }

  [Symbol.toPrimitive]() {
    return super.valueOf();
  }
}

const isResult = (result: RegExpExecArray | null): result is Result => !!result;

const getWordsGenerator = (words: string) => ({
  *[Symbol.iterator]() {
    while (true) {
      const result = REGEX.exec(words);

      if (!isResult(result)) {
        break;
      }

      yield new Word(result.groups);
    }
  },
});

const order = (words: string) =>
  Array.from(getWordsGenerator(words))
    .sort((a, b) => a.position - b.position)
    .join(" ");

// returns "Fo1r the2 g3ood 4of th5e pe6ople e11evEn"
order("4of Fo1r e11evEn pe6ople g3ood th5e the2");
