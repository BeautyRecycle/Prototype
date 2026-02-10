/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...\n");

  // ── Seed Rewards ──
  const rewards = await Promise.all([
    prisma.reward.upsert({
      where: { id: "reward-eco-tote" },
      update: {},
      create: {
        id: "reward-eco-tote",
        name: "Eco Tote Bag",
        description:
          "A beautiful reusable tote bag made from 100% recycled ocean plastic.",
        pointsCost: 50,
        imageUrl: "/rewards/tote-bag.jpg",
        stock: 100,
      },
    }),
    prisma.reward.upsert({
      where: { id: "reward-bamboo-brush" },
      update: {},
      create: {
        id: "reward-bamboo-brush",
        name: "Bamboo Beauty Brush Set",
        description:
          "Sustainably sourced bamboo brush set — gentle on skin and the planet.",
        pointsCost: 80,
        imageUrl: "/rewards/bamboo-brush.jpg",
        stock: 50,
      },
    }),
    prisma.reward.upsert({
      where: { id: "reward-soap-bar" },
      update: {},
      create: {
        id: "reward-soap-bar",
        name: "Organic Soap Bar",
        description:
          "Handcrafted, plastic-free soap bar with essential oils. Zero waste packaging.",
        pointsCost: 30,
        imageUrl: "/rewards/soap-bar.jpg",
        stock: 200,
      },
    }),
    prisma.reward.upsert({
      where: { id: "reward-water-bottle" },
      update: {},
      create: {
        id: "reward-water-bottle",
        name: "Stainless Steel Water Bottle",
        description:
          "Double-walled, vacuum-insulated bottle. Replace 1000 plastic bottles.",
        pointsCost: 100,
        imageUrl: "/rewards/water-bottle.jpg",
        stock: 75,
      },
    }),
    prisma.reward.upsert({
      where: { id: "reward-plant-kit" },
      update: {},
      create: {
        id: "reward-plant-kit",
        name: "Mini Plant Growing Kit",
        description:
          "Grow your own herbs at home with this compostable seed starter kit.",
        pointsCost: 40,
        imageUrl: "/rewards/plant-kit.jpg",
        stock: 150,
      },
    }),
    prisma.reward.upsert({
      where: { id: "reward-discount-10" },
      update: {},
      create: {
        id: "reward-discount-10",
        name: "10% Off Eco Brand Partner",
        description:
          "Get 10% off your next purchase at any of our eco-brand partners.",
        pointsCost: 25,
        imageUrl: "/rewards/discount.jpg",
        stock: 500,
      },
    }),
  ]);

  console.log(`✅ Seeded ${rewards.length} rewards`);
  console.log("\n🌱 Seeding complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
