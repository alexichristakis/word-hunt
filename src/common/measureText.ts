const canvas = document.createElement("canvas");

const measureText = (text: string, fontSize: number) => {
  const context = canvas.getContext("2d");
  if (context) {
    context.font = `${fontSize}px "Inter var", sans-serif`;
    return context.measureText(text).width;
  }
};

export default measureText;
