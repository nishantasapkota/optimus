// Usage: node scripts/show-admin.js <objectIdHex>
const { MongoClient, ObjectId } = require('mongodb')
const id = process.argv[2]
if (!id) {
  console.error('Usage: node scripts/show-admin.js <objectIdHex>')
  process.exit(2)
}
;(async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
  const client = new MongoClient(uri)
  try {
    await client.connect()
    const db = client.db('admin_panel')
    const doc = await db.collection('admins').findOne({ _id: new ObjectId(id) })
    if (!doc) {
      console.log('No admin found for id', id)
      return
    }
    console.log('Document:')
    console.log(JSON.stringify({ _id: doc._id.toString(), email: doc.email, password: doc.password, name: doc.name, role: doc.role, createdAt: doc.createdAt }, null, 2))
    if (typeof doc.password === 'string') {
      const isHash = doc.password.startsWith('$2a$') || doc.password.startsWith('$2b$') || doc.password.startsWith('$2y$')
      console.log('password looks like bcrypt hash?', isHash)
    } else {
      console.log('password field is not a string (maybe undefined)')
    }
  } catch (err) {
    console.error(err)
  } finally {
    await client.close()
  }
})()
