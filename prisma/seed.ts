import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    // Create a test user
    const user = await prisma.user.create({
      data: {
        email: "test@example.com",
        password: "password123",
        name: "John Doe",
      },
    });

    console.log("✅ Seed successful! User created:", user);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
