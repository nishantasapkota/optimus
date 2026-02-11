const { MongoClient } = require("mongodb")

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017"
const client = new MongoClient(uri)

async function seedAppointments() {
  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db("admin_panel")
    const appointmentsCollection = db.collection("appointments")

    // Clear existing appointments
    await appointmentsCollection.deleteMany({})
    console.log("Cleared existing appointments")

    // Sample appointments
    const appointments = [
      {
        name: "John Smith",
        email: "john.smith@example.com",
        phone: "+1 (555) 123-4567",
        service: "consultation",
        preferredDate: new Date("2025-01-15"),
        preferredTime: "10:00",
        message: "I would like to discuss a new website project for my business.",
        status: "pending",
        createdAt: new Date("2025-01-10T09:30:00"),
        updatedAt: new Date("2025-01-10T09:30:00"),
      },
      {
        name: "Sarah Johnson",
        email: "sarah.j@example.com",
        phone: "+1 (555) 234-5678",
        service: "web-development",
        preferredDate: new Date("2025-01-16"),
        preferredTime: "14:00",
        message: "Need help with e-commerce website development.",
        status: "approved",
        createdAt: new Date("2025-01-08T11:15:00"),
        updatedAt: new Date("2025-01-09T10:00:00"),
        reviewedAt: new Date("2025-01-09T10:00:00"),
        reviewedBy: "Admin User",
      },
      {
        name: "Michael Brown",
        email: "m.brown@example.com",
        phone: "+1 (555) 345-6789",
        service: "design",
        preferredDate: new Date("2025-01-17"),
        preferredTime: "11:30",
        message: "Looking for UI/UX design services for mobile app.",
        status: "pending",
        createdAt: new Date("2025-01-11T14:20:00"),
        updatedAt: new Date("2025-01-11T14:20:00"),
      },
      {
        name: "Emily Davis",
        email: "emily.davis@example.com",
        phone: "+1 (555) 456-7890",
        service: "seo",
        preferredDate: new Date("2025-01-18"),
        preferredTime: "15:00",
        message: "Want to improve my website's search engine rankings.",
        status: "completed",
        createdAt: new Date("2025-01-05T08:45:00"),
        updatedAt: new Date("2025-01-07T16:30:00"),
        reviewedAt: new Date("2025-01-06T09:00:00"),
        reviewedBy: "Admin User",
      },
      {
        name: "David Wilson",
        email: "david.w@example.com",
        phone: "+1 (555) 567-8901",
        service: "maintenance",
        preferredDate: new Date("2025-01-19"),
        preferredTime: "09:00",
        message: "Need ongoing maintenance for my WordPress site.",
        status: "rejected",
        createdAt: new Date("2025-01-09T13:10:00"),
        updatedAt: new Date("2025-01-10T11:00:00"),
        reviewedAt: new Date("2025-01-10T11:00:00"),
        reviewedBy: "Admin User",
      },
    ]

    const result = await appointmentsCollection.insertMany(appointments)
    console.log(`Inserted ${result.insertedCount} appointments`)

    console.log("\nAppointments seeded successfully!")
  } catch (error) {
    console.error("Error seeding appointments:", error)
  } finally {
    await client.close()
  }
}

seedAppointments()
