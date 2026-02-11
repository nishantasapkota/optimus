# MongoDB Schema Documentation

## Database: admin_panel

This document provides a complete schema reference for exporting and recreating the database structure.

---

## Collections

### 1. users

**Purpose:** Store user accounts, profiles, and authentication data

**Fields:**
- `_id` (ObjectId) - Unique identifier
- `name` (String, required) - User's full name
- `email` (String, required, unique) - User's email address
- `password` (String) - Hashed password (bcrypt, 10 rounds)
- `role` (String, required) - User role: "admin", "user", or "moderator"
- `status` (String, required) - Account status: "active" or "inactive"
- `avatar` (String) - URL to user avatar image
- `createdAt` (Date, required) - Account creation timestamp
- `updatedAt` (Date, required) - Last update timestamp

**Indexes:**
\`\`\`javascript
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ createdAt: -1 })
\`\`\`

**Validation Schema:**
\`\`\`javascript
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "role", "status", "createdAt", "updatedAt"],
      properties: {
        name: { bsonType: "string" },
        email: { 
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
        },
        password: { bsonType: "string" },
        role: { enum: ["admin", "user", "moderator"] },
        status: { enum: ["active", "inactive"] },
        avatar: { bsonType: "string" },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
})
\`\`\`

---

### 2. activities

**Purpose:** Track user actions and maintain audit trail

**Fields:**
- `_id` (ObjectId) - Unique identifier
- `userId` (ObjectId, required) - Reference to users._id
- `action` (String, required) - Action type (e.g., "user.created", "user.updated")
- `description` (String, required) - Human-readable action description
- `timestamp` (Date, required) - When the action occurred

**Indexes:**
\`\`\`javascript
db.activities.createIndex({ timestamp: -1 })
db.activities.createIndex({ userId: 1 })
\`\`\`

**Validation Schema:**
\`\`\`javascript
db.createCollection("activities", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "action", "description", "timestamp"],
      properties: {
        userId: { bsonType: "objectId" },
        action: { bsonType: "string" },
        description: { bsonType: "string" },
        timestamp: { bsonType: "date" }
      }
    }
  }
})
\`\`\`

---

## Relationships

\`\`\`
users (1) ←→ (many) activities
  - One user can have many activities
  - Each activity belongs to one user
  - Linked via activities.userId → users._id
\`\`\`

---

## Export Commands

### Export entire database:
\`\`\`bash
mongodump --uri="mongodb+srv://username:password@cluster.mongodb.net/admin_panel" --out=./backup
\`\`\`

### Export specific collection:
\`\`\`bash
mongoexport --uri="mongodb+srv://username:password@cluster.mongodb.net/admin_panel" --collection=users --out=users.json
mongoexport --uri="mongodb+srv://username:password@cluster.mongodb.net/admin_panel" --collection=activities --out=activities.json
\`\`\`

### Import to local MongoDB:
\`\`\`bash
mongoimport --uri="mongodb://localhost:27017/admin_panel" --collection=users --file=users.json
mongoimport --uri="mongodb://localhost:27017/admin_panel" --collection=activities --file=activities.json
\`\`\`

### Restore entire database:
\`\`\`bash
mongorestore --uri="mongodb://localhost:27017" --db=admin_panel ./backup/admin_panel
\`\`\`

---

## Migration Script

To recreate the schema on a new MongoDB instance:

\`\`\`javascript
// Connect to MongoDB
use admin_panel;

// Create users collection with validation
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "role", "status", "createdAt", "updatedAt"],
      properties: {
        name: { bsonType: "string" },
        email: { 
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
        },
        password: { bsonType: "string" },
        role: { enum: ["admin", "user", "moderator"] },
        status: { enum: ["active", "inactive"] },
        avatar: { bsonType: "string" },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
});

// Create activities collection with validation
db.createCollection("activities", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "action", "description", "timestamp"],
      properties: {
        userId: { bsonType: "objectId" },
        action: { bsonType: "string" },
        description: { bsonType: "string" },
        timestamp: { bsonType: "date" }
      }
    }
  }
});

// Create indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ createdAt: -1 });
db.activities.createIndex({ timestamp: -1 });
db.activities.createIndex({ userId: 1 });

print("Schema created successfully!");
\`\`\`

---

## Notes

- All timestamps are stored in UTC
- Passwords are hashed using bcrypt with 10 salt rounds
- Email addresses must be unique
- Default avatar URLs use DiceBear API
- Activity logs are kept indefinitely for audit purposes
- Consider adding TTL index on activities for automatic cleanup if needed

---

## Connection Strings

**Cloud MongoDB Atlas:**
\`\`\`
mongodb+srv://username:password@cluster.mongodb.net/admin_panel
\`\`\`

**Local MongoDB:**
\`\`\`
mongodb://localhost:27017/admin_panel
\`\`\`

Replace `username`, `password`, and `cluster` with your actual credentials.
