import sharp from "sharp";
import { readFileSync } from "node:fs";

const source = readFileSync("social-preview.svg");
const metadata = await sharp(source).metadata();
if (metadata.width !== 1200 || metadata.height !== 630) {
  throw new Error("Expected 1200x630 social preview artwork");
}
await sharp(source)
  .flatten({ background: "#cbd2d6" })
  .jpeg({ quality: 90, mozjpeg: true, chromaSubsampling: "4:4:4" })
  .toFile("social-preview.jpg");

const output = await sharp("social-preview.jpg").metadata();
if (output.width !== 1200 || output.height !== 630 || output.format !== "jpeg") {
  throw new Error("Invalid social-preview.jpg");
}
console.log("Generated social-preview.jpg at 1200 x 630.");
