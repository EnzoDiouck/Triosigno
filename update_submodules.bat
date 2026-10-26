echo "Mise à jour des sous-modules..."
git submodule update --remote --merge

echo "Ajout des modifications..."
git add .

echo "Commit des changements..."
git commit -m "Update all submodules to the latest commit"

echo "Pousser vers la branche main..."
git push origin main

echo "Opération terminée avec succès."
