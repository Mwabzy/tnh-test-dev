-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ClinicalService" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "features" TEXT[],
    "image" JSONB NOT NULL,
    "contactId" INTEGER NOT NULL,
    "parentClinicId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClinicalService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Doctor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "clinicalServiceId" INTEGER NOT NULL,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ContactInfo" (
    "id" SERIAL NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "ContactInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EmailEntry" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contactInfoId" INTEGER NOT NULL,

    CONSTRAINT "EmailEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Testimonial" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT,
    "quote" TEXT NOT NULL,
    "clinicalServiceId" INTEGER NOT NULL,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RelatedService" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT NOT NULL,
    "imageAlt" TEXT,
    "link" TEXT,
    "clinicalServiceId" INTEGER NOT NULL,

    CONSTRAINT "RelatedService_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");

-- AddForeignKey
ALTER TABLE "public"."ClinicalService" ADD CONSTRAINT "ClinicalService_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "public"."ContactInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ClinicalService" ADD CONSTRAINT "ClinicalService_parentClinicId_fkey" FOREIGN KEY ("parentClinicId") REFERENCES "public"."ClinicalService"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Doctor" ADD CONSTRAINT "Doctor_clinicalServiceId_fkey" FOREIGN KEY ("clinicalServiceId") REFERENCES "public"."ClinicalService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EmailEntry" ADD CONSTRAINT "EmailEntry_contactInfoId_fkey" FOREIGN KEY ("contactInfoId") REFERENCES "public"."ContactInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Testimonial" ADD CONSTRAINT "Testimonial_clinicalServiceId_fkey" FOREIGN KEY ("clinicalServiceId") REFERENCES "public"."ClinicalService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RelatedService" ADD CONSTRAINT "RelatedService_clinicalServiceId_fkey" FOREIGN KEY ("clinicalServiceId") REFERENCES "public"."ClinicalService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
