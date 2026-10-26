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
