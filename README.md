# 👐 Signify - Fullstack

**Signify** is an interactive platform dedicated to learning French Sign Language (LSF). This project is based on a modern fullstack architecture to offer a smooth, immersive, and accessible user experience. The interactive front-end is supported by a robust back-end and powerful artificial intelligence for real-time sign recognition.

## 🌟 Key Features

- **AI Sign Recognition**: Real-time feedback via the user's camera.
- **Gamification**: Level, points, and leaderboard system to motivate regular practice.
- **Multi-platform Accessibility**: Usable on mobile and web.
- **Personalized Progress**: Reminders and notifications to encourage daily practice.

## 🖥️ Technologies Used

### Front-End

- ![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
- ![React](https://img.shields.io/badge/React-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=black)
- ![Vite](https://img.shields.io/badge/Vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
- ![HTML5](https://img.shields.io/badge/HTML5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
- ![CSS3](https://img.shields.io/badge/CSS3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

### Back-End

- ![NestJS](https://img.shields.io/badge/NestJS-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-%23336791.svg?style=for-the-badge&logo=postgresql&logoColor=white)
- ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=Prisma&logoColor=white)

### Artificial Intelligence

- ![PyTorch](https://img.shields.io/badge/PyTorch-%23EE4C2C.svg?style=for-the-badge&logo=pytorch&logoColor=white)
- ![Python](https://img.shields.io/badge/Python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)

## ⚙️ Prerequisites

- **Node.js** v14 or higher
- **npm** or **yarn**
- **PostgreSQL** for database management

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/EIP-TEK89/trio-signo-fullstack.git
cd trio-signo-fullstack
```

## 1.1 Clone sub-modules
```bash
git submodule update --init --recursive
```
In case you need to update the sub-modules
```bash
git submodule update --remote --merge
```

```bash
git clone https://github.com/EIP-TEK89/trio-signo-fullstack.git
cd trio-signo-fullstack
```

### 2. Install dependencies

#### Front-End

```bash
cd trio-signo-front
npm install
```

#### Back-End

```bash
cd trio-signo-back
npm install
```

### 3. Configure the database

Configure PostgreSQL with a specific user and database.

Create a `.env` file in the backend folder with the following information:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/signify
```

### 4. Start the project

```bash
sudo docker compose build
sudo docker compose up
```

The front-end will be available at `http://localhost:3000`.
The back-end server will be available at `http://localhost:4000`.

## 🧪 Running Tests

#### Front-End

```bash
cd trio-signo-front
npm test
```

#### Back-End

```bash
cd trio-signo-back
npm test
```

## 🚢 Deployment

### For ubuntu server
```sh
# Creating a user (if you're root)
sudo useradd -m -d /home/triosigno -s /bin/bash triosigno
sudo passwd triosigno
sudo usermod -aG docker triosigno
sudo visudo
# Add this line: triosigno ALL=(ALL) NOPASSWD: /usr/bin/docker, /usr/bin systemctl restart docker
# And save file (with nano: add line -> CTRL+X -> CTRL+Y)
su - triosigno


# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

sudo docker run hello-world



# Setting up self hosted
mkdir actions-runner && cd actions-runner

curl -o actions-runner-linux-x64-2.322.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.322.0/actions-runner-linux-x64-2.322.0.tar.gz

echo "b13b784808359f31bc79b08a191f5f83757852957dd8fe3dbfcc38202ccf5768  actions-runner-linux-x64-2.322.0.tar.gz" | shasum -a 256 -c

tar xzf ./actions-runner-linux-x64-2.322.0.tar.gz

./config.sh --url https://github.com/EIP-TEK89/trio-signo-fullstack --token <your_token>

./run.sh

su - root

cd /home/triosigno/actions-runner
sudo ./svc.sh install
sudo ./svc.sh start
```

## 👥 Contributing

The steps for contributing to the project are described in the file [CONTRIBUTING.md](https://github.com/EIP-TEK89/trio-signo-fullstack/blob/main/Contributing.md).
