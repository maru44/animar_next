import { Canvas, createCanvas, loadImage, registerFont } from "canvas";
import * as path from "path";
import fs from "fs";

type OgpMaterial = {
  id: number;
  title: string;
  rating?: number;
  content: string;
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

  registerFont(path.resolve("./public/fonts/NotoSansJP-Medium.otf"), {
    family: "Noto",
  });

  const backgroundImage = await loadImage(
    path.resolve("./public/ogp_background1.jpg")
  );
  ctx.drawImage(backgroundImage, DX, DY, WIDTH, HEIGHT);

  /**
   * title
   */
  ctx.font = "60px Noto";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  const rawTitle = props.title;
  const sepText = createTextLine(canvas, rawTitle);
  ctx.fillText(sepText.line, 100, 60);

  /**
   * content
   */
  ctx.font = "45px Noto";
  const content = props.content;
  const lines = createTextLines(canvas, content.replace(/\r?\n/g, " "));
  lines.forEach((line, index) => {
    if (index < 6) ctx.fillText(line, 100, 150 + index * 60);
  });

  /**
   * additional
   */
  ctx.font = "36px Noto";
  const rating = props.rating;
  if (rating) {
    const star = `★ ${rating}`;
    ctx.fillText(star, 100, 580);
  }
  const loveanime = "loveani.me";
  ctx.textAlign = "right";
  ctx.fillText(loveanime, 1100, 580);

  const buffer = canvas.toBuffer();
  fs.writeFileSync(path.resolve(`./public/ogp/review_${props.id}.png`), buffer);
};

export const createOgpBuffer = async (props: OgpMaterial) => {
  const WIDTH = 1200;
  const HEIGHT = 630;
  const DX = 0;
  const DY = 0;
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext("2d");

  registerFont(path.resolve("./public/fonts/NotoSansJP-Medium.otf"), {
    family: "Noto",
  });

  const backgroundImage = await loadImage(
    path.resolve("./public/ogp_background1.jpg")
  );
  ctx.drawImage(backgroundImage, DX, DY, WIDTH, HEIGHT);

  /**
   * title
   */
  ctx.font = "60px Noto";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  const rawTitle = props.title;
  const sepText = createTextLine(canvas, rawTitle);
  ctx.fillText(sepText.line, 100, 60);

  /**
   * content
   */
  ctx.font = "45px Noto";
  const content = props.content;
  const lines = createTextLines(canvas, content.replace(/\r?\n/g, " "));
  lines.forEach((line, index) => {
    if (index < 6) ctx.fillText(line, 100, 150 + index * 60);
  });

  /**
   * additional
   */
  ctx.font = "36px Noto";
  const rating = props.rating;
  if (rating) {
    const star = `★ ${rating}`;
    ctx.fillText(star, 100, 580);
  }
  const loveanime = "loveani.me";
  ctx.textAlign = "right";
  ctx.fillText(loveanime, 1100, 580);

  const buffer = canvas.toBuffer();
  return buffer;
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
