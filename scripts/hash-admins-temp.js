// Temporary script to hash any plaintext admin passwords (avoids shell quoting issues)
const { MongoClient } = require('mongodb')
const bcrypt = require('bcryptjs')

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const dbName = 'admin_panel'

;(async () => {
  const client = new MongoClient(uri)
  try {
    await client.connect()
    const db = client.db(dbName)

    const admins = await db.collection('admins').find({ password: { $exists: true } }).toArray()
    const toHash = admins.filter((a) => typeof a.password === 'string' && !a.password.startsWith('$2'))

    if (toHash.length === 0) {
      console.log('No plaintext admin passwords found')
      return
    }

    for (const a of toHash) {
      const hash = await bcrypt.hash(a.password, 10)
      await db.collection('admins').updateOne({ _id: a._id }, { $set: { password: hash } })
      console.log('Hashed admin', a.email, '_id', a._id.toString())
    }

    console.log('Done')
  } catch (err) {
    console.error(err)
    process.exit(1)
  } finally {
    await client.close()
  }
})()
