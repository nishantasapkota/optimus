import { createTestimonial } from "../lib/db-utils";
import { ObjectId } from "mongodb";

async function seed() {
    const testimonials = [
        {
            name: "Manu Arora",
            designation: "Product Manager at TechFlow",
            description:
                "The attention to detail and innovative solutions provided by this team are truly world-class. Highly recommended for anyone looking to scale their business.",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            name: "Sarah Chen",
            designation: "CTO at LogiK",
            description:
                "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            name: "James Kim",
            designation: "Engineering Lead at DataScale",
            description:
                "The support team is amazing. They helped us through every step of the integration process.",
            image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
    ];

    console.log("Seeding testimonials...");
    for (const t of testimonials) {
        const result = await createTestimonial(t);
        console.log(`Added: ${t.name} (ID: ${result.insertedId})`);
    }
    console.log("Seeding complete!");
    process.exit(0);
}

seed().catch(err => {
    console.error("Seed failed:", err);
    process.exit(1);
});
