// Create initial admin user
// Run this with: node scripts/03-create-admin.js

const { MongoClient } = require("mongodb")

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017"
const dbName = "admin_panel"

async function createAdmin() {
  const client = new MongoClient(uri)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db(dbName)

    // Check if admin already exists
    const existingAdmin = await db.collection("admins").findOne({ email: "admin@example.com" })

    const force = process.env.FORCE_UPDATE === '1' || process.env.FORCE_UPDATE === 'true' || process.argv.includes('--force') || process.argv.includes('--update')

    if (existingAdmin) {
      if (!process.env.ADMIN_PASSWORD && !force) {
        console.log("Admin user already exists!")
        return
      }
      // If ADMIN_PASSWORD provided or force flag set, update the existing admin's password
      if (process.env.ADMIN_PASSWORD || force) {
        const bcrypt = require('bcryptjs')
        const crypto = require('crypto')
        let rawPassword = process.env.ADMIN_PASSWORD
        let generated = false
        if (!rawPassword) {
          rawPassword = crypto.randomBytes(12).toString('base64').replace(/\+/g, 'A').replace(/\//g, 'B').replace(/=+$/, '').slice(0,16)
          generated = true
        }
        const hashed = await bcrypt.hash(rawPassword, 10)
        await db.collection('admins').updateOne({ _id: existingAdmin._id }, { $set: { password: hashed } })
        console.log('Admin password updated for', existingAdmin.email)
        if (generated) {
          console.log('Generated password:', rawPassword)
        } else {
          console.log('Password was taken from ADMIN_PASSWORD environment variable.')
        }
        return
      }
    }

    // Create admin user
    // Password is taken from ADMIN_PASSWORD env var if set. Otherwise a secure
    // random password will be generated. The password is hashed with bcrypt
    // before being stored and printed once to stdout so it is not kept in the repo.
    const bcrypt = require('bcryptjs')
    const crypto = require('crypto')

    const email = 'admin@example.com'
    let rawPassword = process.env.ADMIN_PASSWORD
    let generated = false
    if (!rawPassword) {
      rawPassword = crypto.randomBytes(12).toString('base64').replace(/\+/g, 'A').replace(/\//g, 'B').replace(/=+$/, '').slice(0,16)
      generated = true
    }

    const hashed = await bcrypt.hash(rawPassword, 10)

    const admin = {
      email,
      password: hashed,
      name: "Admin User",
      role: "superadmin",
      createdAt: new Date(),
    }

    await db.collection("admins").insertOne(admin)
    console.log("Admin user created successfully!")
    console.log("Email:", email)
    if (generated) {
      console.log("Generated password:", rawPassword)
      console.log("(This password will not be stored in plaintext.)")
    } else {
      console.log("Password was taken from ADMIN_PASSWORD environment variable.")
    }
  } catch (error) {
    console.error("Error creating admin:", error)
  } finally {
    await client.close()
  }
}

createAdmin()
