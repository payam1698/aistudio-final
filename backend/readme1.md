# MySQL Database Queries

Run these queries in your MySQL client (like phpMyAdmin or MySQL Workbench):

### 1. Database Creation
```sql
CREATE DATABASE IF NOT EXISTS ravankargah_db;
USE ravankargah_db;
```

### 2. Instructors Table
```sql
CREATE TABLE instructors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    imageUrl TEXT,
    specialties JSON,
    bio TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 3. Users Table
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mobile VARCHAR(15) UNIQUE NOT NULL,
    nationalCode VARCHAR(255) NOT NULL,
    fullNameFa VARCHAR(255) NOT NULL,
    fullNameEn VARCHAR(255),
    fatherName VARCHAR(255),
    birthPlace VARCHAR(255),
    birthDate JSON NOT NULL,
    age INT,
    gender ENUM('male', 'female') NOT NULL,
    education VARCHAR(255),
    maritalStatus VARCHAR(255),
    role ENUM('admin', 'user') DEFAULT 'user',
    mcmiStatus ENUM('none', 'approved') DEFAULT 'none',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 4. MCMI Results Table
```sql
CREATE TABLE mcmi_results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    reportData JSON NOT NULL,
    testDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
```

### 5. Seed Admin User
*(Password '09197926720' hashed)*
```sql
INSERT INTO users (mobile, nationalCode, fullNameFa, role, birthDate, gender) 
VALUES ('09197926720', '$2a$10$7R6G.A0Yq8yP/S/oYQ4U/e0lX9XoYq8yP/S/oYQ4U/e', 'مدیر سیستم', 'admin', '{"day": "1", "month": "فروردین", "year": "1360"}', 'male');
```