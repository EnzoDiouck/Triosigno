# Déploiement de Trio Signo sur triosigno.com

Ce document décrit comment déployer l'application Trio Signo sur un VPS avec le domaine triosigno.com.

## Prérequis

- Un VPS avec Docker et Docker Compose installés
- Le domaine triosigno.com pointant vers l'IP de votre VPS
- Les ports 80 et 443 ouverts sur votre VPS

## Structure du déploiement

L'application est composée de plusieurs services Docker :

- **nginx** : Reverse proxy gérant les requêtes entrantes et le SSL
- **certbot** : Service pour obtenir et renouveler les certificats SSL
- **front-service** : Interface utilisateur (React)
- **server** : Backend API (NestJS)
- **ai-service** : Service d'intelligence artificielle
- **db** : Base de données PostgreSQL

## Installation

1. Clonez le dépôt et ses sous-modules :

   ```bash
   git clone --recursive https://github.com/votre-utilisateur/trio-signo-fullstack.git
   cd trio-signo-fullstack
   ```

   Si vous avez déjà cloné le dépôt sans les sous-modules :

   ```bash
   git submodule update --init --recursive
   ```

2. Initialisez les certificats SSL :

   ```bash
   ./init_ssl.sh
   ```

3. Démarrez les services :

   ```bash
   docker-compose up -d
   ```

4. Vérifiez que l'application est accessible sur https://triosigno.com

## Mise à jour

Pour mettre à jour l'application :

1. Tirez les dernières modifications :

   ```bash
   git pull
   git submodule update --recursive
   ```

2. Reconstruisez et redémarrez les services :
   ```bash
   docker-compose down
   docker-compose up -d --build
   ```

## Déploiement automatique (CI/CD)

L'application est configurée avec GitHub Actions pour permettre un déploiement automatique sur le VPS lorsqu'un push est effectué sur la branche `main`. Le workflow de déploiement :

1. Clone le dépôt et ses sous-modules
2. Se connecte au VPS via SSH
3. Met à jour le code source et les sous-modules
4. Initialise les certificats SSL si nécessaire
5. Redémarre les services Docker

Les secrets suivants doivent être configurés dans les paramètres du dépôt GitHub :

- `VPS_SSH_KEY` : Clé SSH privée pour se connecter au VPS
- `VPS_USER` : Nom d'utilisateur sur le VPS
- `VPS_HOST` : Adresse IP ou nom d'hôte du VPS

Vous pouvez également déclencher manuellement le déploiement depuis l'onglet "Actions" du dépôt GitHub.

## Renouvellement des certificats SSL

Les certificats Let's Encrypt expirent après 90 jours. Pour les renouveler manuellement :

```bash
docker-compose run --rm certbot renew
docker-compose restart nginx
```

Vous pouvez également configurer une tâche cron pour automatiser ce processus.

## Dépannage

- **Problèmes de certificats SSL** : Vérifiez que les ports 80 et 443 sont ouverts et que le domaine pointe vers votre VPS.
- **Problèmes de service** : Consultez les logs avec `docker-compose logs [service]` (par exemple `docker-compose logs server`).
