const canvas = document.createElement("canvas");

export const MONOSPACE_FONT = "normal 12px monospace";

const measureText = (text: string, font: string) => {
  const context = canvas.getContext("2d");
  if (context) {
    context.font = font;
    return context.measureText(text).width;
  }
};

export default measureText;
