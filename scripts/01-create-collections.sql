-- MongoDB uses collections instead of tables
-- This script is for reference - MongoDB creates collections automatically
-- Run these commands in MongoDB shell or Compass

-- Switch to admin_panel database
use admin_panel;

-- Create users collection with validation
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "role", "status", "createdAt", "updatedAt"],
      properties: {
        name: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
          description: "must be a valid email and is required"
        },
        role: {
          enum: ["admin", "user", "moderator"],
          description: "must be one of the enum values"
        },
        status: {
          enum: ["active", "inactive"],
          description: "must be one of the enum values"
        },
        createdAt: {
          bsonType: "date"
        },
        updatedAt: {
          bsonType: "date"
        }
      }
    }
  }
});

-- Create activities collection
db.createCollection("activities", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "action", "description", "timestamp"],
      properties: {
        userId: {
          bsonType: "objectId"
        },
        action: {
          bsonType: "string"
        },
        description: {
          bsonType: "string"
        },
        timestamp: {
          bsonType: "date"
        }
      }
    }
  }
});

-- Create indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ createdAt: -1 });
db.activities.createIndex({ timestamp: -1 });
db.activities.createIndex({ userId: 1 });
