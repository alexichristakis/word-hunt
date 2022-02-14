const getWords = async () => {
  const { words } = await import("../assets/words.json");
  return new Set(words);
};

export default getWords;
