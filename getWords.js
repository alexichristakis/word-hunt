const run = async () => {
  const fs = await import("fs");
  const { words } = require("./src/assets/dictionary.json");
  const { default: pako } = await import("pako");

  // filter for words with at least 3 letters and compress
  const filtered = words.filter((word) => word.length > 2);
  const compressed = pako.deflate(JSON.stringify(filtered));

  fs.writeFileSync(
    "./src/assets/words.json",
    `{"data": "${btoa(compressed)}"}`
  );
};

run();
