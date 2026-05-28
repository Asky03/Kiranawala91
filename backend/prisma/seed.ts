/**
 * Prisma seed script.
 * Run with: pnpm prisma:seed
 *
 * Creates three deterministic test users so login works immediately after setup.
 * Passwords are hashed with the same bcrypt config used at runtime.
 *
 * ⚠️  In production, NEVER run this. Set NODE_ENV=production and the seed
 *     script in package.json should be a no-op or skipped entirely.
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const SALT_ROUNDS = 12;

interface SeedUser {
  email: string;
  password: string;
  name: string;
  role: 'CUSTOMER' | 'SHOPKEEPER' | 'ADMIN';
  phone?: string;
}

const users: SeedUser[] = [
  {
    email: 'admin@kiranawala.local',
    password: 'Admin@12345',
    name: 'Platform Admin',
    role: 'ADMIN',
    phone: '9000000000',
  },
  {
    email: 'shopkeeper@kiranawala.local',
    password: 'Shop@12345',
    name: 'Ramesh Shopkeeper',
    role: 'SHOPKEEPER',
    phone: '9000000001',
  },
  {
    email: 'customer@kiranawala.local',
    password: 'Customer@12345',
    name: 'Priya Customer',
    role: 'CUSTOMER',
    phone: '9000000002',
  },
];

async function main() {
  console.log('🌱 Seeding database...');

  for (const u of users) {
    const passwordHash = await bcrypt.hash(u.password, SALT_ROUNDS);

    const user = await prisma.user.upsert({
      where: { email: u.email },
      // If user already exists, update everything EXCEPT password
      // (so repeated seeds don't reset the dev password if you changed it).
      update: { name: u.name, role: u.role, phone: u.phone },
      create: {
        email: u.email,
        password: passwordHash,
        name: u.name,
        role: u.role,
        phone: u.phone,
      },
    });

    console.log(`  ✅ ${user.role.padEnd(11)} ${user.email}  (password: ${u.password})`);
  }

  console.log('\n✨ Seed complete. Test credentials above.\n');
}

main()
  .catch((err) => {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });