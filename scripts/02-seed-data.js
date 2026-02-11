// MongoDB seed data script
// Run this with: node scripts/02-seed-data.js

const { MongoClient, ObjectId } = require("mongodb")

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017"
const dbName = "admin_panel"

async function seedData() {
  const client = new MongoClient(uri)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db(dbName)

    // Clear existing data
    await db.collection("users").deleteMany({})
    await db.collection("activities").deleteMany({})
    console.log("Cleared existing data")

    // Seed users
    const users = [
      {
        name: "John Doe",
        email: "john@example.com",
        role: "admin",
        status: "active",
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-01-15"),
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        role: "user",
        status: "active",
        createdAt: new Date("2024-02-10"),
        updatedAt: new Date("2024-02-10"),
      },
      {
        name: "Bob Johnson",
        email: "bob@example.com",
        role: "moderator",
        status: "active",
        createdAt: new Date("2024-03-05"),
        updatedAt: new Date("2024-03-05"),
      },
      {
        name: "Alice Williams",
        email: "alice@example.com",
        role: "user",
        status: "inactive",
        createdAt: new Date("2024-01-20"),
        updatedAt: new Date("2024-01-20"),
      },
      {
        name: "Charlie Brown",
        email: "charlie@example.com",
        role: "user",
        status: "active",
        createdAt: new Date("2024-02-28"),
        updatedAt: new Date("2024-02-28"),
      },
    ]

    const insertedUsers = await db.collection("users").insertMany(users)
    console.log(`Inserted ${insertedUsers.insertedCount} users`)

    // Seed activities
    const userIds = Object.values(insertedUsers.insertedIds)
    const activities = [
      {
        userId: userIds[0],
        action: "login",
        description: "User logged in",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      },
      {
        userId: userIds[1],
        action: "update_profile",
        description: "Updated profile information",
        timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      },
      {
        userId: userIds[2],
        action: "create_post",
        description: "Created a new post",
        timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
      },
      {
        userId: userIds[0],
        action: "delete_comment",
        description: "Deleted a comment",
        timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
      },
      {
        userId: userIds[4],
        action: "login",
        description: "User logged in",
        timestamp: new Date(Date.now() - 1000 * 60 * 240), // 4 hours ago
      },
    ]

    const insertedActivities = await db.collection("activities").insertMany(activities)
    console.log(`Inserted ${insertedActivities.insertedCount} activities`)

    console.log("Seed data completed successfully!")
  } catch (error) {
    console.error("Error seeding data:", error)
  } finally {
    await client.close()
  }
}

seedData()
