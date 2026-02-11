import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017"
const client = new MongoClient(uri)

async function seedBlogsAndServices() {
  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db("admin_panel")

    // Seed Blogs
    const blogs = [
      {
        title: "Getting Started with Next.js 15",
        slug: "getting-started-nextjs-15",
        content:
          "Next.js 15 brings exciting new features including improved performance, better developer experience, and enhanced routing capabilities. In this comprehensive guide, we'll explore all the new features and how to leverage them in your projects.",
        excerpt: "Explore the new features and improvements in Next.js 15",
        author: "John Doe",
        status: "published",
        tags: ["nextjs", "react", "web development"],
        featuredImage: "/nextjs-logo.png",
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-01-15"),
        publishedAt: new Date("2024-01-15"),
      },
      {
        title: "Building Scalable APIs with Node.js",
        slug: "building-scalable-apis-nodejs",
        content:
          "Learn how to build production-ready, scalable APIs using Node.js and Express. We'll cover best practices, security considerations, and performance optimization techniques.",
        excerpt: "Best practices for creating robust and scalable Node.js APIs",
        author: "Jane Smith",
        status: "published",
        tags: ["nodejs", "api", "backend"],
        featuredImage: "/nodejs-api-concept.png",
        createdAt: new Date("2024-01-20"),
        updatedAt: new Date("2024-01-20"),
        publishedAt: new Date("2024-01-20"),
      },
      {
        title: "Modern CSS Techniques for 2024",
        slug: "modern-css-techniques-2024",
        content:
          "CSS has evolved significantly. Discover the latest CSS features including container queries, cascade layers, and modern layout techniques that will transform your web designs.",
        excerpt: "Discover the latest CSS features and techniques",
        author: "Mike Johnson",
        status: "draft",
        tags: ["css", "frontend", "design"],
        createdAt: new Date("2024-02-01"),
        updatedAt: new Date("2024-02-01"),
      },
    ]

    const blogsResult = await db.collection("blogs").insertMany(blogs)
    console.log(`Inserted ${blogsResult.insertedCount} blogs`)

    // Seed Services
    const services = [
      {
        name: "Web Development",
        slug: "web-development",
        description:
          "Full-stack web development services using modern technologies like React, Next.js, Node.js, and MongoDB. We build scalable, performant, and user-friendly web applications tailored to your business needs.",
        shortDescription: "Custom web applications built with modern technologies",
        price: 5000,
        currency: "USD",
        status: "active",
        category: "Development",
        features: [
          "Responsive Design",
          "SEO Optimization",
          "Performance Optimization",
          "Cross-browser Compatibility",
          "API Integration",
        ],
        icon: "/web-dev-icon.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Mobile App Development",
        slug: "mobile-app-development",
        description:
          "Native and cross-platform mobile application development for iOS and Android. We create intuitive, high-performance mobile apps that engage users and drive business growth.",
        shortDescription: "iOS and Android app development services",
        price: 8000,
        currency: "USD",
        status: "active",
        category: "Development",
        features: [
          "Native iOS & Android",
          "Cross-platform Solutions",
          "App Store Deployment",
          "Push Notifications",
          "Offline Support",
        ],
        icon: "/mobile-icon.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "UI/UX Design",
        slug: "ui-ux-design",
        description:
          "Professional UI/UX design services that focus on creating beautiful, intuitive, and user-centered digital experiences. From wireframes to high-fidelity prototypes.",
        shortDescription: "User-centered design for digital products",
        price: 3000,
        currency: "USD",
        status: "active",
        category: "Design",
        features: ["User Research", "Wireframing", "Prototyping", "Design Systems", "Usability Testing"],
        icon: "/design-icon.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Cloud Infrastructure",
        slug: "cloud-infrastructure",
        description:
          "Cloud infrastructure setup and management services. We help you deploy, scale, and maintain your applications on AWS, Google Cloud, or Azure with best practices.",
        shortDescription: "Cloud deployment and infrastructure management",
        price: 4000,
        currency: "USD",
        status: "active",
        category: "DevOps",
        features: [
          "AWS/GCP/Azure Setup",
          "CI/CD Pipelines",
          "Auto-scaling",
          "Monitoring & Logging",
          "Security Hardening",
        ],
        icon: "/cloud-icon.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "SEO Optimization",
        slug: "seo-optimization",
        description:
          "Comprehensive SEO services to improve your website's visibility and ranking in search engines. Technical SEO, content optimization, and link building strategies.",
        shortDescription: "Improve your search engine rankings",
        price: 2000,
        currency: "USD",
        status: "inactive",
        category: "Marketing",
        features: [
          "Technical SEO Audit",
          "Keyword Research",
          "On-page Optimization",
          "Link Building",
          "Performance Reports",
        ],
        icon: "/seo-icon.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    const servicesResult = await db.collection("services").insertMany(services)
    console.log(`Inserted ${servicesResult.insertedCount} services`)

    console.log("Blogs and Services seeded successfully!")
  } catch (error) {
    console.error("Error seeding data:", error)
  } finally {
    await client.close()
  }
}

seedBlogsAndServices()
