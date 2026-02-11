// Migration: hash existing plaintext passwords for admins and users
// Run: node scripts/04-hash-passwords.js

const { MongoClient } = require('mongodb')
const bcrypt = require('bcryptjs')

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const dbName = 'admin_panel'

async function run() {
  const client = new MongoClient(uri)
  try {
    await client.connect()
    const db = client.db(dbName)

    // Hash admins
    const admins = await db.collection('admins').find({}).toArray()
    for (const admin of admins) {
      if (admin.password && !admin.password.startsWith('$2a$') && !admin.password.startsWith('$2b$') && !admin.password.startsWith('$2y$')) {
        const hash = await bcrypt.hash(admin.password, 10)
        await db.collection('admins').updateOne({ _id: admin._id }, { $set: { password: hash } })
        console.log(`Hashed admin ${admin.email}`)
      }
    }

    // Hash users
    const users = await db.collection('users').find({}).toArray()
    for (const user of users) {
      if (user.password && !user.password.startsWith('$2a$') && !user.password.startsWith('$2b$') && !user.password.startsWith('$2y$')) {
        const hash = await bcrypt.hash(user.password, 10)
        await db.collection('users').updateOne({ _id: user._id }, { $set: { password: hash } })
        console.log(`Hashed user ${user.email}`)
      }
    }

    console.log('Completed password hashing migration')
  } catch (err) {
    console.error('Migration error', err)
  } finally {
    await client.close()
  }
}

run()
