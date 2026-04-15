-- CreateEnum
CREATE TYPE "hero_power" AS ENUM ('flight', 'strength', 'telepathy', 'speed', 'invisibility');

-- CreateEnum
CREATE TYPE "hero_status" AS ENUM ('available', 'busy', 'retired');

-- CreateEnum
CREATE TYPE "incident_level" AS ENUM ('low', 'medium', 'critical');

-- CreateEnum
CREATE TYPE "incident_status" AS ENUM ('open', 'assigned', 'resolved');

-- CreateTable
CREATE TABLE "heroes" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "power" "hero_power" NOT NULL,
    "status" "hero_status" NOT NULL DEFAULT 'available',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "missions_count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "heroes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "incidents" (
    "id" SERIAL NOT NULL,
    "location" VARCHAR(180) NOT NULL,
    "level" "incident_level" NOT NULL,
    "status" "incident_status" NOT NULL DEFAULT 'open',
    "hero_id" INTEGER,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "district" VARCHAR(100),
    "assigned_at" TIMESTAMPTZ(6),
    "resolved_at" TIMESTAMPTZ(6),

    CONSTRAINT "incidents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(80) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IncidentCategory" (
    "incidentId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "IncidentCategory_pkey" PRIMARY KEY ("incidentId","categoryId")
);

-- CreateIndex
CREATE UNIQUE INDEX "heroes_name_unique" ON "heroes"("name");

-- CreateIndex
CREATE INDEX "incidents_hero_id_index" ON "incidents"("hero_id");

-- CreateIndex
CREATE UNIQUE INDEX "category_name_unique" ON "category"("name");

-- AddForeignKey
ALTER TABLE "incidents" ADD CONSTRAINT "incidents_hero_id_foreign" FOREIGN KEY ("hero_id") REFERENCES "heroes"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "IncidentCategory" ADD CONSTRAINT "IncidentCategory_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "incidents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncidentCategory" ADD CONSTRAINT "IncidentCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
