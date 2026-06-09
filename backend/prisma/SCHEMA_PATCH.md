// =================================================================
// PATCH for backend/prisma/schema.prisma
// =================================================================
// Find your existing `model Shop {...}` block in schema.prisma.
// REPLACE it with the model below.
// Also ADD the `enum ShopStatus` block above the model.
// If your User model doesn't have a `shop` relation field, add it too.
// =================================================================

enum ShopStatus {
  PENDING
  APPROVED
  REJECTED
  SUSPENDED
}

model Shop {
  id          String     @id @default(cuid())

  // Owner — one-to-one (a shopkeeper owns ONE shop)
  ownerId     String     @unique
  owner       User       @relation(fields: [ownerId], references: [id])

  // Identity
  name        String     @db.VarChar(100)
  description String?    @db.VarChar(500)

  // Location (manual MVP — geo coords come later in Day 5+)
  addressLine String     @db.VarChar(200)
  city        String     @db.VarChar(80)
  pincode     String     @db.VarChar(6)

  // Operations
  status      ShopStatus @default(PENDING)
  isOpen      Boolean    @default(true)
  openingTime String?    @db.VarChar(5)   // "09:00"
  closingTime String?    @db.VarChar(5)   // "21:00"

  // Contact (optional shop-specific phone, falls back to owner.phone)
  phone       String?    @db.VarChar(15)

  // Approval metadata
  rejectionReason String?   @db.VarChar(500)
  approvedAt      DateTime?
  approvedById    String?

  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  // Relations
  products    Product[]
  orders      Order[]
  reviews     Review[]

  @@index([status])
  @@index([city, pincode])
}

// =================================================================
// On your User model, make sure this field exists (one-to-one back-reference):
// =================================================================
// model User {
//   ... existing fields ...
//   shop  Shop?
//   ... rest of fields ...
// }
// =================================================================

// After editing schema.prisma, run this from your project root:
//
//   pnpm --filter backend prisma migrate dev --name day3-shop-fields
//
// This creates a new migration file and applies it to your DB.