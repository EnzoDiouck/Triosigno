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

// Leçons de l'alphabet : uniquement des exercices à la caméra
const seed = "src/core/seed/services/alphabet-seed.service.ts";
let a = fs.readFileSync(seed, "utf8");
const seedRules = [
  ["const exerciseTypes: ExerciseType[] = ['WORD_TO_IMAGE', 'IMAGE_TO_WORD'];", "const exerciseTypes: ExerciseType[] = ['SIGN_RECOGNITION'];"],
  ["} else if (type === 'IMAGE_TO_WORD') {", "} else if (type === 'SIGN_RECOGNITION') {\n              prompt = `Show the sign for the letter ${letter} to the camera.`;\n            } else if (type === 'IMAGE_TO_WORD') {"],
];
for (const [from, to] of seedRules) {
  if (!a.includes(from)) { console.error("[patch-server] Motif introuvable : " + from); process.exit(1); }
  a = a.replace(from, to);
}
fs.writeFileSync(seed, a);
console.log("[patch-server] Exercices caméra uniquement.");
