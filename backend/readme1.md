# Database Documentation (SQL)

### 1. Create Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    mobile VARCHAR(15) UNIQUE NOT NULL,
    nationalCode VARCHAR(255) NOT NULL,
    fullNameFa VARCHAR(255) NOT NULL,
    fullNameEn VARCHAR(255),
    fatherName VARCHAR(255),
    birthPlace VARCHAR(255),
    birthDate JSONB NOT NULL,
    age INTEGER,
    gender VARCHAR(10) CHECK (gender IN ('male', 'female')),
    education VARCHAR(255),
    maritalStatus VARCHAR(255),
    role VARCHAR(10) DEFAULT 'user' CHECK (role IN ('admin', 'user')),
    mcmiStatus VARCHAR(10) DEFAULT 'none' CHECK (mcmiStatus IN ('none', 'approved')),
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Create MCMI Results Table
```sql
CREATE TABLE mcmi_results (
    id SERIAL PRIMARY KEY,
    userId INTEGER REFERENCES users(id) ON DELETE CASCADE,
    reportData JSONB NOT NULL,
    testDate TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Seed Admin Data
*Note: Password '09197926720' is hashed.*
```sql
INSERT INTO users (mobile, nationalCode, fullNameFa, role, birthDate, gender) 
VALUES ('09197926720', '$2a$10$7R6G.A0Yq8yP/S/oYQ4U/e0lX9XoYq8yP/S/oYQ4U/e', 'مدیر سیستم', 'admin', '{"day": "1", "month": "فروردین", "year": "1360"}', 'male');
```