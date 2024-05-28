-- CreateTable
CREATE TABLE "solicitud" (
    "id" SERIAL NOT NULL,
    "correo" VARCHAR(255) NOT NULL,
    "itemid" INTEGER NOT NULL,
    "estado" VARCHAR(255) NOT NULL,

    CONSTRAINT "solicitud_pkey" PRIMARY KEY ("id")
);
