#!/bin/bash

# Script pour initialiser ou vérifier les certificats SSL pour triosigno.com

# Arrêter les conteneurs en cours d'exécution
docker compose down

# Démarrer seulement Nginx pour l'initialisation
docker compose up -d nginx

# Attendre que Nginx démarre
echo "Attente de démarrage de Nginx..."
sleep 5

# Vérifier si le certificat existe déjà
if [ -d "/etc/letsencrypt/live/triosigno.com" ] || docker compose exec nginx [ -d "/etc/letsencrypt/live/triosigno.com" ]; then
    echo "Un certificat SSL existe déjà pour triosigno.com"
    
    # Optionnel : vérifier si le certificat est toujours valide
    # docker compose run --rm certbot certificates
    
    # Optionnel : renouveler le certificat si nécessaire
    # docker compose run --rm certbot renew
else
    # Obtenir un nouveau certificat SSL
    echo "Obtention d'un nouveau certificat SSL..."
    docker compose run --rm certbot certonly --webroot --webroot-path=/var/www/html --email admin@triosigno.com --agree-tos --no-eff-email -d triosigno.com -d www.triosigno.com
fi

# Redémarrer tous les services
docker compose down
docker compose up -d

echo "Configuration terminée ! Vérifiez que le site est accessible sur https://triosigno.com"
