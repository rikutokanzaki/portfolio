import { delay } from "@/utils/delay";
import { getRandomString } from "@/utils/getRandomString";

const NOISE_CHARS = ["-", "_", "/", "\\", "|", "+", "*", "~", ".", ":"];

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const simulateTyping = async (
  texts: Array<string>,
  onUpdate: (text: string) => void,
  charDelayMs = 90,
) => {
  for (const text of texts) {
    let displayedText = "";
    onUpdate(displayedText);

    for (const char of text) {
      await delay(charDelayMs);

      displayedText += char;
      onUpdate(displayedText);
    }
  }
};

export const replaceText = async (
  initialText: string,
  resultText: string,
  onUpdate: (text: string) => void,
  charDelayMs = 90,
) => {
  const initialChars = Array.from(initialText);
  const resultChars = Array.from(resultText);
  const maxLength = Math.max(initialChars.length, resultChars.length);

  const currentChars = Array.from(
    { length: maxLength },
    (_, index) => initialChars[index] ?? "",
  );
  const targetChars = Array.from(
    { length: maxLength },
    (_, index) => resultChars[index] ?? "",
  );

  const pendingIndexes = new Set<number>();

  for (let i = 0; i < maxLength; i += 1) {
    if (currentChars[i] !== targetChars[i]) {
      pendingIndexes.add(i);
    }
  }

  onUpdate(currentChars.join(""));

  while (pendingIndexes.size > 0) {
    const indexes = Array.from(pendingIndexes);
    const batchSize = randomInt(1, Math.min(3, indexes.length));

    for (let i = 0; i < batchSize; i += 1) {
      const randomPosition = randomInt(0, indexes.length - 1);
      const index = indexes.splice(randomPosition, 1)[0];

      if (Math.random() < 0.75) {
        currentChars[index] = getRandomString(NOISE_CHARS, 1);
        onUpdate(currentChars.join(""));

        await delay(randomInt(Math.max(1, Math.floor(charDelayMs * 0.2)), Math.max(1, Math.floor(charDelayMs * 0.6))));
      }

      currentChars[index] = targetChars[index];
      pendingIndexes.delete(index);
      onUpdate(currentChars.join(""));

      await delay(randomInt(Math.max(1, Math.floor(charDelayMs * 0.5)), Math.max(1, Math.floor(charDelayMs * 1.1))));
    }
  }
};
