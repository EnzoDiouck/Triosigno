// Adapte le serveur TrioSigno pour tourner en local sans Supabase.
const fs = require("fs");
const file = "src/services/storage/supabase.service.ts";
let s = fs.readFileSync(file, "utf8");
const rules = [
  ["throw new Error('Supabase configuration (URL and Key) must be provided.');",
   "this.logger.warn('Supabase non configuré : stockage des médias désactivé (mode local).'); return;"],
  ["async getUrl(word: string): Promise<string> {", "async getUrl(word: string): Promise<string> {\n    if (!this.client) return '';"],
  ["async listFiles(search?: string): Promise<string[]> {", "async listFiles(search?: string): Promise<string[]> {\n    if (!this.client) return [];"],
  ["async deleteFile(word: string): Promise<void> {", "async deleteFile(word: string): Promise<void> {\n    if (!this.client) return;"],
];
for (const [from, to] of rules) {
  if (!s.includes(from)) { console.error("[patch-server] Motif introuvable : " + from); process.exit(1); }
  s = s.replace(from, to);
}
fs.writeFileSync(file, s);
console.log("[patch-server] Supabase rendu optionnel.");
