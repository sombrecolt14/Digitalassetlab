// "Build": copy the static site into dist/ (served by server.cjs).
import fs from "node:fs";

fs.rmSync("dist", { recursive: true, force: true });
fs.cpSync("site", "dist", { recursive: true });
console.log("Copied site/ -> dist/:", fs.readdirSync("dist").join(", "));
