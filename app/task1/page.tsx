"use client";
import { useState } from "react";
import { ChangeEvent } from "react";

const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
const isLetter = (char: string) => {
  return /[A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]/.test(char);
};

const shuffleWord = (word: string) => {
  const letters = [];

  for (let i = 0; i < word.length; i++) {
    if (isLetter(word[i])) {
      letters.push(word[i]);
    }
  }

  if (letters.length < 3) return word;

  const middleStart = 1;
  const middleEnd = letters.length - 1;

  const middleLetters = letters.slice(middleStart, middleEnd);

  shuffleArray(middleLetters);

  letters.splice(middleStart, middleLetters.length, ...middleLetters);

  const newWordArray = word.split("");
  let letterIndex = 0;

  for (let i = 0; i < word.length; i++) {
    if (isLetter(word[i])) {
      newWordArray[i] = letters[letterIndex];
      letterIndex++;
    }
  }

  return newWordArray.join("");
};

const Task1 = () => {
  const [originalText, setOriginalText] = useState("");
  const [shuffledText, setShuffledText] = useState("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setOriginalText(`${ev.target?.result}`);
      };
      reader.readAsText(file);
    }
  };

  const handleShuffle = () => {
    const lines = originalText.split(/\r?\n/);
    const resultLines = lines.map((line: string) => {
      const words = line.split(" ");
      const shuffledWords = words.map((word: string) => shuffleWord(word));
      return shuffledWords.join(" ");
    });

    setShuffledText(resultLines.join("\n"));
  };

  return (
    <div className="p-8">
      <h2 className="mb-4 title">Shuffling letters from text file</h2>
      <input className="input-primary mr-4 mb-4" type="file" accept=".txt" onChange={handleFileChange} />
      <button className="btn-primary" disabled={!originalText} onClick={handleShuffle}>
        Shuffle letters
      </button>

      <h3 className="subtitle mt-10">Original text:</h3>
      <div className="border bg-white border-gray-400 rounded p-4">{originalText}</div>

      <h3 className="subtitle mt-6">Shuffled text:</h3>
      <div className="border bg-white border-gray-400 rounded p-4">{shuffledText}</div>
    </div>
  );
};

export default Task1;
