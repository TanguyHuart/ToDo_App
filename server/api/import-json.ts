import { promises as fs } from "fs";
import path from "path";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  console.log(body);

  const filepath = path.resolve("assets/data/data.json");

  await fs.writeFile(filepath, JSON.stringify(body, null, 2));

  return { success: true, taskList: body };
});
