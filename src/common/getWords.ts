import pako from "pako";

const getWords = async (): Promise<Set<string>> => {
  const { data } = await import("../assets/words.json");

  try {
    const buffer = Uint8Array.from(JSON.parse(`[${atob(data)}]`));
    const words = JSON.parse(pako.inflate(buffer, { to: "string" }));
    return new Set(words);
  } catch (err) {
    console.log(err);
  }

  return new Set();
};

export default getWords;
