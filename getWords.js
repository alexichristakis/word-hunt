const run = async () => {
  const fs = await import("fs");
  const { default: wordlist } = await import("wordlist-english");
  const allWords = wordlist["english"];

  fs.writeFileSync(
    "./src/assets/words.json",
    JSON.stringify({ words: allWords.filter((word) => word.length > 2) })
  );
};

run();
