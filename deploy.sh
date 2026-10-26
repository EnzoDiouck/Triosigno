#!/bin/bash

# Colors for messages
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

FRONT_DIR="refacto-front"
BACK_DIR="trio-signo-server"
AI_DIR="trio-signo-ai"
MOBILE_DIR="trio-signo-mobile"

echo -e "${YELLOW}Starting deployment script...${NC}"

# Function to check if a directory exists
check_directory() {
    if [ ! -d "$1" ]; then
        echo -e "${RED}Error: Directory '$1' does not exist.${NC}"
        exit 1
    fi
}

# Check if the script can run git commands
if ! git rev-parse --is-inside-work-tree &>/dev/null; then
    echo -e "${RED}Error: This script must be run inside a git repository.${NC}"
    exit 1
fi


# Update front-end
echo -e "${YELLOW}Updating font-end...${NC}"
if [ ! -d "$FRONT_DIR" ]; then
    echo -e "${YELLOW}Warning: Directory '$FRONT_DIR' does not exist. Skipping front-end deployment.${NC}"
else
    check_directory "$FRONT_DIR"
    echo -e "${GREEN}Deploying front-end...${NC}"
    cd "$FRONT_DIR" || exit
    git pull origin main
    if [ $? -ne 0 ]; then
        echo -e "${RED}Error: Front-end update failed.${NC}"
        exit 1
    fi
    echo -e "${GREEN}Front-end updated successfully.${NC}"
    cd ..
fi

# Update back-end
echo -e "${YELLOW}Updating back-end...${NC}"
if [ ! -d "$BACK_DIR" ]; then
    echo -e "${YELLOW}Warning: Directory '$BACK_DIR' does not exist. Skipping back-end deployment.${NC}"
else
    check_directory "$BACK_DIR"
    echo -e "${GREEN}Deploying back-end...${NC}"
    cd "$BACK_DIR" || exit
    git pull origin main
    if [ $? -ne 0 ]; then       
        echo -e "${RED}Error: Back-end update failed.${NC}"
        exit 1
    fi
    echo -e "${GREEN}Back-end updated successfully.${NC}"
    cd ..
fi

# Update AI service
echo -e "${YELLOW}Updating AI service...${NC}"
# if [ ! -d "$AI_DIR" ]; then
#     echo -e "${YELLOW}Warning: Directory '$AI_DIR' does not exist. Skipping AI service deployment.${NC}"
# else
#     check_directory "$AI_DIR"
#     echo -e "${GREEN}Deploying AI service...${NC}"
#     cd "$AI_DIR" || exit
#     git pull origin main
#     if [ $? -ne 0 ]; then
#         echo -e "${RED}Error: AI service update failed.${NC}"
#         exit 1
#     fi
#     echo -e "${GREEN}AI service updated successfully.${NC}"
#     cd ..
# fi

# Update mobile app
echo -e "${YELLOW}Updating mobile app...${NC}"
# if [ ! -d "$MOBILE_DIR" ]; then
#     echo -e "${YELLOW}Warning: Directory '$MOBILE_DIR' does not exist. Skipping mobile app deployment.${NC}"
# else
#     check_directory "$MOBILE_DIR"
#     echo -e "${GREEN}Deploying mobile app...${NC}"
#     cd "$MOBILE_DIR" || exit
#     git pull origin main
#     if [ $? -ne 0 ]; then
#         echo -e "${RED}Error: Mobile app update failed.${NC}"
#         exit 1
#     fi
#     echo -e "${GREEN}Mobile app updated successfully.${NC}"
#     cd ..
# fi

# Mobile and AI are not updated for now for performance reasons

echo -e "${GREEN}All directory updated succesfully!${NC}"

# Check if the current branch is 'main'
current_branch=$(git rev-parse --abbrev-ref HEAD)
if [ "$current_branch" != "main" ]; then
    echo -e "${RED}Error: This script must be run on the 'main' branch.${NC}"
    exit 1
fi

# Docker commands
echo -e "${YELLOW}Building and deploying Docker containers...${NC}"
docker compose down
if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Docker compose down failed.${NC}"
    exit 1
fi

docker compose up -d --build
if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Docker compose up failed.${NC}"
    exit 1
fi
echo -e "${GREEN}Docker containers built and deployed successfully.${NC}"
