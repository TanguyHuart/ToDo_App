// server/api/data.json.ts
import data from "@/assets/data/data.json";

export default defineEventHandler((event) => {
  event.node.res.setHeader("Content-Type", "application/json");
  event.node.res.setHeader(
    "Content-Disposition",
    'attachment; filename="data.json"',
  );

  return data;
});
