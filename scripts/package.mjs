import { existsSync } from "node:fs";
import { join } from "node:path";

const outFile = join(process.cwd(), "dist", "plugin_package.zip");

if (!existsSync(outFile)) {
  console.error('JQ: dist/plugin_package.zip not found. Run `bun run build` first.');
  process.exit(1);
}

console.log(`JQ: using ${outFile} created by caido-dev`);

