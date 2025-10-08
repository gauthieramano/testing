type RegexResult = RegExpExecArray & {
  groups: {
    word: string;
    position: string;
  };
};

type Group = {
  word: string;
  position: number;
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

const isResult = (result: RegExpExecArray | null): result is RegexResult =>
  !!result;

const order = (words: string) => {
  const unsortedGroups: Group[] = [];

  while (true) {
    const result = REGEX.exec(words);

    if (!isResult(result)) {
      break;
    }

    const { word, position } = result.groups;

    unsortedGroups.push({
      word,
      position: parseInt(position, 10),
    });
  }

  return unsortedGroups
    .sort((a, b) => a.position - b.position)
    .map(({ word }) => word)
    .join(" ");
};

// returns "Fo1r the2 g3ood 4of th5e pe6ople e11evEn"
order("4of Fo1r e11evEn pe6ople g3ood th5e the2");
