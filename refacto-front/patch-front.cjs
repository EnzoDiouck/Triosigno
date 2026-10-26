// Supprime l'écran de connexion : le site se connecte tout seul avec le compte de démo.
const fs = require("fs");
const file = "src/store/auth/hooks/useAuthState.ts";
let s = fs.readFileSync(file, "utf8");
const rules = [
  ['import type { AuthState } from "../types";',
   'import type { AuthState } from "../types";\nimport { loginService } from "../services/authServices";'],
  ["const [state, setState] = useState<AuthState>(initialAuthState);",
   'const [state, setState] = useState<AuthState>(() => ({ ...initialAuthState, isLoading: !localStorage.getItem("token") }));'],
  ['const user = localStorage.getItem("user");',
   `const user = localStorage.getItem("user");

    // Mode démo local : connexion automatique, sans écran de login
    if (!token || !user) {
      loginService("demo@triosigno.local", "Demo1234!")
        .then((r) => {
          localStorage.setItem("token", r.accessToken);
          localStorage.setItem("refreshToken", r.refreshToken);
          localStorage.setItem("user", JSON.stringify(r.user));
          setState({ ...initialAuthState, isAuthenticated: true, isLoading: false, user: r.user });
        })
        .catch((e: Error) => setState({ ...initialAuthState, isLoading: false, error: "Connexion automatique impossible : " + e.message }));
      return;
    }`],
];
for (const [from, to] of rules) {
  if (!s.includes(from)) { console.error("[patch-front] Motif introuvable : " + from); process.exit(1); }
  s = s.replace(from, to);
}
fs.writeFileSync(file, s);
console.log("[patch-front] Connexion automatique activée.");

// Filet de sécurité : n'afficher que les exercices à la caméra
const lf = "src/features/lessons/hooks/useLessonDetail.ts";
let l = fs.readFileSync(lf, "utf8");
const from = "setExercises(exercisesData);";
if (!l.includes(from)) { console.error("[patch-front] Motif introuvable : " + from); process.exit(1); }
l = l.replace(from, 'setExercises(exercisesData.filter((e) => e.type === "SIGN_RECOGNITION"));');
fs.writeFileSync(lf, l);
console.log("[patch-front] Exercices caméra uniquement.");

// Les exercices "SIGN_RECOGNITION" des leçons demandaient de taper la réponse au clavier :
// on les remplace par la reconnaissance à la caméra (même composant que la page /ai-recognition).
const ex = "src/features/lessons/components/SignRecognitionExercise.tsx";
if (!fs.existsSync(ex)) { console.error("[patch-front] Fichier introuvable : " + ex); process.exit(1); }
fs.writeFileSync(ex, `import React from "react";
import type { Sign } from "../../../types/lesson";
import VideoCaptureUploader from "../../../components/VideoStream";

interface SignRecognitionExerciseProps {
  prompt: string;
  sign: Sign | null;
  loadingSign: boolean;
  selectedAnswer: string | null;
  isAnswerCorrect: boolean | null;
  onAnswerSelection: (answer: string) => void;
}

const SignRecognitionExercise: React.FC<SignRecognitionExerciseProps> = ({
  prompt,
  sign,
  loadingSign,
  selectedAnswer,
  isAnswerCorrect,
  onAnswerSelection,
}) => {
  const found = selectedAnswer !== null || isAnswerCorrect !== null;
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-4 text-[var(--color-blue)]">{prompt}</h2>
      {loadingSign ? (
        <div className="flex justify-center p-4">
          <div className="animate-spin h-8 w-8 border-4 border-[var(--color-blue)] border-t-transparent rounded-full"></div>
        </div>
      ) : sign ? (
        <div className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl">
          <p className="text-6xl font-bold mb-4 text-[var(--color-blue)]">{sign.word.toUpperCase()}</p>
          {found ? (
            <p className="text-green-600 font-semibold text-lg">Signe reconnu ✓</p>
          ) : (
            <VideoCaptureUploader
              goodAnswer={() => onAnswerSelection(sign.word)}
              badAnswer={() => {}}
              response={sign.word.toLowerCase()}
            />
          )}
        </div>
      ) : (
        <div className="p-4 text-center text-red-500">Sign data not available</div>
      )}
    </div>
  );
};

export default SignRecognitionExercise;
`);
console.log("[patch-front] Exercices de leçon branchés sur la caméra.");
