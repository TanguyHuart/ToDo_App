// server/api/data.json.ts
import data from "@/assets/data/data.json";

export default defineEventHandler((event) => {
  // Définir les en-têtes pour forcer le téléchargement
  event.node.res.setHeader("Content-Type", "application/json");
  event.node.res.setHeader(
    "Content-Disposition",
    'attachment; filename="data.json"',
  );

  // Envoyer le JSON
  const jsonData = data;
  return jsonData;
});
