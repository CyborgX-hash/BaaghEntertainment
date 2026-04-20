import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

const globalForPrisma = global as unknown as { prisma: ReturnType<typeof createPrismaClient> };

function createPrismaClient() {
    return new PrismaClient({
        datasources: {
            db: {
                url: process.env.DATABASE_URL || "postgres://edbdb3591c5f2fc1cbd181ff63ce74e432deb35ce245d90d59bf4e43ed9d9fac:sk_AKbGDWFyEaCS3wV7TyLZk@db.prisma.io:5432/postgres?sslmode=require"
            }
        },
        log: ['error', 'warn'],
    }).$extends(withAccelerate());
}

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
