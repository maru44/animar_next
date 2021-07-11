import { Canvas, createCanvas, loadImage, registerFont } from "canvas";
import * as path from "path";
import fs from "fs";

type OgpMaterial = {
  id: number;
};

type sepText = {
  line: string;
  remaining: string;
};

export const createOgp = async (props: OgpMaterial) => {
  const WIDTH = 1200;
  const HEIGHT = 630;
  const DX = 0;
  const DY = 0;
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext("2d");

  registerFont(path.resolve("./fonts/NotoSansJP-Medium.otf"), {
    family: "Noto",
  });

  // const backgroundImage = await loadImage(path.resolve("./public/ogp_background1.jpg"));
  //   ctx.drawImage(backgroundImage, DX, DY, WIDTH, HEIGHT);

  ctx.font = "60px Noto";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const title = "テストしてます。\n\nテスト中";

  const lines = createTextLines(canvas, title);
  lines.forEach((line, index) => {
    const y = 314 + 80 * (index - (lines.length - 1) / 2);
    ctx.fillText(line, 600, y);
  });
  const buffer = canvas.toBuffer();
  fs.writeFileSync(path.resolve(`./public/ogp/${props.id}.png`), buffer);
};

const createTextLines = (canvas: Canvas, text: string): string[] => {
  const lines: string[] = [];
  let currentText = text;

  while (currentText !== "") {
    const separatedText = createTextLine(canvas, currentText);
    lines.push(separatedText.line);
    currentText = separatedText.remaining;
  }
  return lines;
};

const createTextLine = (canvas: Canvas, text: string): sepText => {
  const context = canvas.getContext("2d");
  const MAX_WIDTH = 1000;

  for (let i = 0; i < text.length; i++) {
    const line = text.substring(0, i + 1);
    if (context.measureText(line).width > MAX_WIDTH) {
      return {
        line,
        remaining: text.substring(i + 1),
      };
    }
  }

  return {
    line: text,
    remaining: "",
  };
};
