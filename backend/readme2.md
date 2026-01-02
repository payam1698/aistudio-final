# Implementation Guide (MySQL Edition)

### 1. Prerequisites
- **Node.js** installed.
- **XAMPP** or **WAMP** or a standalone **MySQL** server running.

### 2. Setup Database
1. Open **phpMyAdmin**.
2. Create a new database named `ravankargah_db`.
3. The server will automatically create tables on first run via Sequelize `sync`.

### 3. Backend Setup
```bash
# Enter backend directory
cd backend

# Install dependencies
npm install

# Compile TypeScript
npm run build

# Start in development mode
npm run dev
```

### 4. Environment Variables
Update the `.env` file with your MySQL credentials:
- `DB_USER`: usually `root`
- `DB_PASS`: empty string in XAMPP by default
- `DB_NAME`: `ravankargah_db`

### 5. Alignment with Frontend
All models use **CamelCase** to ensure that when you fetch data from `http://localhost:5000/api/...`, the frontend can directly map them to the TypeScript interfaces (e.g., `user.fullNameFa`).

### 6. Security
Passwords (national codes) are hashed using `bcryptjs` before storage. Sessions are managed via **JWT** tokens valid for 30 days.