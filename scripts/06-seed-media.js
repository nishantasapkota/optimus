const { MongoClient } = require("mongodb")

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017"
const client = new MongoClient(uri)

async function seedMedia() {
  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db("admin_panel")
    const mediaCollection = db.collection("media")

    // Clear existing media
    await mediaCollection.deleteMany({})

    // Sample media data (placeholder images)
    const sampleMedia = [
      {
        fileName: "1704067200000-hero-image.jpg",
        originalName: "hero-image.jpg",
        url: "/modern-office.png",
        size: 245678,
        mimeType: "image/jpeg",
        alt: "Modern office workspace",
        caption: "Professional workspace setup",
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-01"),
      },
      {
        fileName: "1704153600000-team-photo.jpg",
        originalName: "team-photo.jpg",
        url: "/professional-team-meeting.png",
        size: 189234,
        mimeType: "image/jpeg",
        alt: "Team collaboration",
        caption: "Our amazing team",
        createdAt: new Date("2024-01-02"),
        updatedAt: new Date("2024-01-02"),
      },
      {
        fileName: "1704240000000-product-showcase.jpg",
        originalName: "product-showcase.jpg",
        url: "/modern-product-display.png",
        size: 156789,
        mimeType: "image/jpeg",
        alt: "Product showcase",
        caption: "Featured products",
        createdAt: new Date("2024-01-03"),
        updatedAt: new Date("2024-01-03"),
      },
      {
        fileName: "1704326400000-blog-header.jpg",
        originalName: "blog-header.jpg",
        url: "/technology-abstract.jpg",
        size: 198456,
        mimeType: "image/jpeg",
        alt: "Technology abstract",
        caption: "Tech blog header",
        createdAt: new Date("2024-01-04"),
        updatedAt: new Date("2024-01-04"),
      },
      {
        fileName: "1704412800000-service-icon.png",
        originalName: "service-icon.png",
        url: "/generic-service-icon.png",
        size: 45678,
        mimeType: "image/png",
        alt: "Service icon",
        caption: "Service category icon",
        createdAt: new Date("2024-01-05"),
        updatedAt: new Date("2024-01-05"),
      },
    ]

    const result = await mediaCollection.insertMany(sampleMedia)
    console.log(`✓ Inserted ${result.insertedCount} media files`)

    // Create indexes
    await mediaCollection.createIndex({ createdAt: -1 })
    await mediaCollection.createIndex({ fileName: 1 }, { unique: true })
    console.log("✓ Created indexes for media collection")

    console.log("\n✓ Media seeding completed successfully!")
  } catch (error) {
    console.error("Error seeding media:", error)
  } finally {
    await client.close()
  }
}

seedMedia()
