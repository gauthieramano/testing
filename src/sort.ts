type Result = RegExpExecArray & {
  groups: {
    word: string;
    position: string;
  };
};

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

const isResult = (result: RegExpExecArray | null): result is Result => !!result;

const getWordsGenerator = (words: string) => ({
  *[Symbol.iterator]() {
    while (true) {
      const result = REGEX.exec(words);

      if (!isResult(result)) {
        break;
      }

      const { word, position } = result.groups;

      yield {
        word,
        position: parseInt(position, 10),
      };
    }
  },
});

const order = (words: string) =>
  Array.from(getWordsGenerator(words))
    .sort((a, b) => a.position - b.position)
    .map(({ word }) => word)
    .join(" ");

// returns "Fo1r the2 g3ood 4of th5e pe6ople e11evEn"
order("4of Fo1r e11evEn pe6ople g3ood th5e the2");
