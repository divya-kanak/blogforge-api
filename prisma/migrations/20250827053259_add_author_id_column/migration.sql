-- AlterTable
ALTER TABLE "Prisma"."Post" ADD COLUMN     "authorId" INTEGER;

-- CreateTable
CREATE TABLE "Prisma"."User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Prisma"."Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Prisma"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
