## Usage

Rename the .envexample to .env and add your MONGO_URI

### Install dependencies

```
# Backend deps
cd backend
npm install

# Frontend deps
cd frontend
npm install
```

### env file

```
# MERN-stack
.env
NODE_ENV = development
PORT = 5000
MONGO_URI = mongodb+srv://ugnius:ugnius@egzaminas.x2azvme.mongodb.net/?retryWrites=true&w=majority&appName=Egzaminas
JWT_SECRET = abc123
```

### Run Server

```
npm run server
```